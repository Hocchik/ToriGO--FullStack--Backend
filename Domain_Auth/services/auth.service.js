import {
  createUser,
  findUserByDNI,
  findUserByEmail,
  findUserByPhone
  /* logIn */
} from '../repositories/user.repository.js';
import { createPassenger } from '../../Domain_Passenger/repositories/passenger.repository.js';
import {
  createDriver,
  validateDriverData,
  verifyLicense,
  verifySoat
} from '../../Domain_Driver/repositories/driver.repository.js';
import { getUserRoles } from '../repositories/role.repository.js';
import { generateToken } from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt';


// Registrar pasajeros
export const registerPassenger = async (RegisterPassengerDto) => {
  const validation = await validateData(RegisterPassengerDto, "PASSENGER");

  // si el form no ha sido completado, se le avisa al usuario que debe completarlo
  if (!validation.valid) {
    return validation;
  }

  // si el form está completo, se continua con el flujo:
  const { name, last_name, dni, age, email, phone, password } = RegisterPassengerDto;


  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    last_name,
    dni,
    age,
    email,
    phone,
    password: hashedPassword,
  });

  // // se puede eliminar
  // if (role === 'passenger') {
  //   if (age < 18) {
  //     return {
  //       status: 400,
  //       data: { error: 'Minors must have a guardian' },
  //     };
  //   }
  //   await createPassenger({ user_id: user.id });
  // }
  // //------------------------

  // // se puede eliminar
  // if (role === 'driver') {
  //   await createDriver({ user_id: user.id });
  // }
  // //-------------------------

  const token = generateToken({
    userId: user.id,
    dni: user.dni,
    role,
  });

  return {
    status: 201,
    data: {
      message: 'User registered successfully',
      token,
      role,
      user: {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        dni: user.dni,
        email: user.email,
        phone: user.phone,
      },
    },
  };
};

// Registrar conductores
export const registerDriver = async (RegisterDriverDto) => {
  // Log para depuración: muestra el DTO recibido
  /* console.log('DTO recibido en registerDriver:', RegisterDriverDto); */

  // Validación explícita de DNI
  if (!RegisterDriverDto.dni) {
    throw new Error('El campo dni no fue recibido en el DTO. Verifica la estructura del objeto enviado.');
  }
  // Nos aseguramos que el DTO tenga el campo role: "DRIVER"
  const driverDto = { ...RegisterDriverDto };

  const {
    name,
    last_name,
    dni,
    plate,
    license_number,
    license_expiration_date,
    insurance_policy_number,
    insurance_policy_expiration_date,
    email,
    phone,
    password
  } = driverDto;

  // validaciones de los campos
  const validation = await validateData(driverDto);

  if (!validation.valid) {
    throw new Error(validation.data.error);
  }

  // Verificar licencia (ahora pasando name y last_name)
  const licenseCheck = await verifyLicense(license_number, license_expiration_date, name, last_name);
  if (!licenseCheck.valid) {
    return {
      valid: false,
      status: 400,
      data: { error: licenseCheck.error || 'Licencia inválida o no existe' }
    };
  }

  // Verificar SOAT
  const soatCheck = await verifySoat(insurance_policy_number, insurance_policy_expiration_date, plate);
  if (!soatCheck.valid) {
    return {
      valid: false,
      status: 400,
      data: { error: soatCheck.error || 'SOAT inválido o no existe' }
    };
  }

  // Verificamos que la licencia y placa pertenezcan al driver
  const is_data_valid = await validateDriverData(dni, license_number, plate, name, last_name);
  if (!is_data_valid) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Datos de conductor inválidos' }
    };
  }

  // creamos el usuario
  const hashedPassword = await bcrypt.hash(password, 10);
  const age_check = 20; // No es necesario para los drivers
  const role_driver = 'DRIVER';

  const user = await createUser({
    name,
    last_name,
    dni,
    phone,
    email,
    age: age_check, // No necesario para los drivers
    password: hashedPassword,
  })

    // creamos al driver
    const driver = await createDriver({
      user_id: user.id,
      license_number,
      plate,
    });
  
    return {
    status: 201,
    data: {
      message: 'Driver registered successfully',
      user: {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        dni: user.dni,
        email: user.email,
        phone: user.phone,
      },
      driver,
    },
  };
};

// Inicio de sesión (pasajeros y conductores)
export const loginUser = async (loginDto) => {
  const { emailorphone, email, phone, password } = loginDto || {};
  const identifier = (emailorphone || email || phone || '').trim();

  if (!identifier) {
    return { valid: false, status: 400, data: { error: 'Debe proporcionar email o teléfono' } };
  }
  if (!password) {
    return { valid: false, status: 400, data: { error: 'Debe proporcionar la contraseña' } };
  }

  console.log( await bcrypt.hash(password, 10));
  // Validación de email
  const emailRegex = /^[\w.-]+@([\w-]+\.)+(com||edu.pe)$/i;
  // Validación de teléfono peruano: +51 seguido de 9 dígitos que empieza con 9
  const phoneRegex = /^\+51\s?9\d{8}$/;

  let does_user_exist = null;

  if (identifier.includes("@")) {
    // Validar email real
    if (!emailRegex.test(identifier)) {
      return {
        valid: false,
        status: 400,
        data: { error: 'El correo debe ser válido y terminar en .com, .edu o .pe' }
      };
    }
    console.log("Iniciando sesión con email...");
    does_user_exist = await findUserByEmail(identifier);
  } else {
    // Validar teléfono peruano
    if (!phoneRegex.test(identifier)) {
      return {
        valid: false,
        status: 400,
        data: { error: 'El teléfono debe iniciar con +51 y tener 9 dígitos comenzando con 9' }
      };
    }
    console.log("Iniciando sesión con teléfono...");
    does_user_exist = await findUserByPhone(identifier);
  }

  if (does_user_exist && await bcrypt.compare(password, does_user_exist.password)) {
    // derive role based on membership in passengers/drivers tables
    const roles = await getUserRoles(does_user_exist.id);
    const derivedRole = roles.includes('driver') ? 'DRIVER' : (roles.includes('passenger') ? 'PASSENGER' : 'USER');

    const token = generateToken({
      userId: does_user_exist.id,
      dni: does_user_exist.dni,
      role: derivedRole,
    });
    return {
      valid: true,
      status: 200,
      data: {
        message: 'Login successful',
        token,
        role: derivedRole,
        user: {
          id: does_user_exist.id,
          name: does_user_exist.name,
          last_name: does_user_exist.last_name,
          email: does_user_exist.email,
          phone: does_user_exist.phone,
        },
      },
    };
  }

  // Si el usuario no existe o la contraseña es incorrecta, retorna objeto de error
  return {
    valid: false,
    status: 401,
    data: { error: 'Usuario o contraseña incorrectos' }
  };
}

// Funcion que valida que los campos de los formularios de registro de pasajeros y conductores hayan sido llenados correctamente
const validateData = async (RegisterDto) => {

  /*
    Validaciones generales ------------------------------------------------------------
  */
  const {dni, phone, email, password, name, last_name, role} = RegisterDto;

  // Eliminamos espacios vacíos y validamos que los campos existan
  const trimedDNI = (dni || '').trim();
  const trimedPhone = (phone || '').trim();
  const trimedEmail = (email || '').trim();

  // Validaciones de DNI
  if (!trimedDNI) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar un DNI' },
    };
  }
  if(!/^\d+$/.test(trimedDNI)) {
    return {
      valid: false,
      status: 400,
      data: {error: 'El DNI no puede contener letras, solo números'}
    }
  }
  if(trimedDNI.length != 8) {
    return {
      valid: false,
      status: 400,
      data: { error: 'El DNI debe tener 8 dígitos' }
    };
  }
  const existingUser = await findUserByDNI(trimedDNI);
  if (existingUser) {
    return { 
      valid: false,
      status: 409,
      data: { error: 'DNI ya registrado' } };
  }

  // Validaciones de teléfono
  if(!trimedPhone) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar un número de teléfono'}
    }
  }
  if(trimedPhone.substring(0,3) != '+51') {
    return {
      valid: false,
      status: 400,
      data: { error: 'Antes del número de teléfono debe incluir el código de Perú (+51)'}
    }
  }
  if(trimedPhone[4] != '9' || trimedPhone.substring(3, trimedPhone.length-1).length != 9) {
    console.log("PRUEBAS DE PHONE");
    console.log(trimedPhone[3]);
    console.log(trimedPhone.substring(3, trimedPhone.length-1).length);
    return {
      valid: false,
      status: 400,
      data: { error: 'El número de teléfono debe iniciar con 9 y debe tener 9 digitos'}
    }
  }

  // Validaciones de email
  if (!trimedEmail) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar un correo electrónico' },
    };
  }
  if(!trimedEmail.includes("@")) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar un correo electrónico válido' },
    };
  }

  // Validamos que el campo age haya sido completado
  // Validamos que el usuario sea mayor de edad (>=18)

  /* if(!age) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar su edad' }
    };
  }

  if(age < 18) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ser mayor de edad para poder registrarse' }
    };
  } */

  // Validamos que el campo password haya sido completado
  if(!password) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar una contraseña' }
    };
  }

  console.log("Name", name);
  console.log("Last Name", last_name);
  console.log("Role", role);

  // Validamos que el campo name y last_name hayan sido completados
  if(!name || !last_name) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar su nombre y apellido' }
    };
  }


  //------------------------------------------------------------------------------------

  if(role == "DRIVER") {
    const {plate, license_number, license_expiration_date, insurance_policy_number, insurance_policy_expiration_date } = RegisterDto;

    // Validaciones de la placa y la licencia
    // Validamos que el campo license y plate hayan sido completados
    if(!license_number || !plate) {
      return {
        valid: false,
        status: 400,
        data: { error: 'Debe ingresar su licencia y placa del vehículo' }
      };
    }

    // Validamos que la licencia tenga el formato correcto (ejemplo: A06702426) y que tenga 9 caracteres
    const licensePattern = /^[A-Z]\d{8}$/;
    if(!licensePattern.test(license_number)) {
      return {
        valid: false,
        status: 400,
        data: { error: 'La licencia debe tener el formato correcto (ejemplo: A06702426) y 9 caracteres' }
      };
    }

    if(!license_expiration_date) {
      return {
        valid: false,
        status: 400,
        data: { error: 'Debe ingresar la fecha de expiración de su licencia' }
      };
    }

    // Nuevo formato de placa: NNNN-LL (ejemplo: 0670-EZ)
    const platePattern = /^\d{4}-[A-Z]{2}$/;
    if (!platePattern.test(plate)) {
      return {
        valid: false,
        status: 400,
        data: { error: 'La placa debe tener el formato NNNN-LL (ej: 0670-EZ)' }
      };
    }

    // Validaciones del seguro de poliza y su fecha de expiracion
    //SOAT-EZ-0670-2025
    if(!insurance_policy_number) {
      return {
        valid: false,
        status: 400,
        data: { error: 'Debe ingresar su póliza de seguro' }
      };
    }

    // Nuevo formato de póliza: SOAT-<PLATE>-<YEAR> donde <PLATE> es NNNN-LL
    const insurancePolicyPattern = /^SOAT-\d{4}-[A-Z]{2}-\d{4}$/;
    if(!insurancePolicyPattern.test(insurance_policy_number)) {
      return {
        valid: false,
        status: 400,
        data: { error: 'La póliza de seguro debe tener el formato correcto (ejemplo: SOAT-0670-EZ-2025)' }
      };
    }

    if(!insurance_policy_expiration_date) {
      return {
        valid: false,
        status: 400,
        data: { error: 'Debe ingresar la fecha de expiración de su póliza de seguro' }
      };
    }
    
    const currentDate = new Date();
    const expDate = new Date(insurance_policy_expiration_date);
    if(expDate <= currentDate) {
      return {
        valid: false,
        status: 400,
        data: { error: 'La fecha de expiración de la póliza de seguro debe ser una fecha futura' }
      };
    }


    // Si pasa las validaciones, @returns {valid = true} 
     return {
      valid: true,
      status: 200,
      data: { message: 'Validacion exitosa del conductor'}
    };
  }

  if(role == 'PASSENGER'){
      return {
      valid: true,
      status: 200,
      data: { message: 'Validacion exitosa del pasajero' }
    };
  }

  // Si el rol no es reconocido, retorna error consistente
  return {
    valid: false,
    status: 400,
    data: { error: 'Rol no reconocido o faltante en el DTO' }
  };
}

