import {
  createUser,
  findUserByDNI,
  findUserByEmailOrPhone,
  logIn
} from '../repositories/user.repository.js';
import { createPassenger } from '../repositories/passenger.repository.js';
import {
  createDriver,
  validateDriverData
} from '../repositories/driver.repository.js';
import { getUserRoles } from '../repositories/role.repository.js';
import { generateToken } from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt';
// ...existing code...

// Registrar pasajeros
export const registerPassenger = async (RegisterPassengerDto) => {
  const validation = await validateData(RegisterPassengerDto, "PASSENGER");

  // si el form no ha sido completado, se le avisa al usuario que debe completarlo
  if (!validation.valid) {
    return validation;
  }

  // si el form está completo, se continua con el flujo:
  const { name, last_name, dni, age, email, phone, password, role } = RegisterPassengerDto;


  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    last_name,
    dni,
    age,
    email,
    phone,
    password: hashedPassword,
    role,
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
  const {
    name,
    last_name,
    dni,
    age,
    email,
    phone,
    password,
    role,
    license,
    plate,
    insurance_policy,
    expiration_date,
  } = RegisterDriverDto;

  /*
    validaciones de los campos
  */

  // verificamos se hayan llenado todos los campos del form correctament
  const validation = await validateData(RegisterDriverDto, "DRIVER");


  if (!validation.valid) {
    throw new Error(validation.data.error);
  }

  /* 
     verificamos que la licencia exista y le pertenezca al driver al igual que
     la placa del vehiculo 
  */

  const is_data_valid = await validateDriverData(dni, license, plate, name, last_name);

  if (!is_data_valid) {
    return {
      valid: false,
      status: 400,
      data: {error: 'Invalid data'}
    }
  }

  // creamos el usuario
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    last_name,
    dni,
    phone,
    email,
    age,
    password: hashedPassword,
    role,
  })

    // creamos al driver
    const driver = createDriver({
    user_id: user.id,
    license,
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
export const loginUser = async (email, password) => {
  const does_user_exist = await logIn(email,password)

  if(!does_user_exist){
    return {
      valid: false,
      status: 400,
      data:{error : "El usuario no existe"} 
    }
  }

  return console.log("inicio de sesión exitoso!!!")
}

// Funcion que valida que los campos de los formularios de registro de pasajeros y conductores hayan sido llenados correctamente
const validateData = async (RegisterDto) => {

  /*
    Validaciones generales ------------------------------------------------------------
  */
  
  const {dni, phone, email, age, password, name, last_name, role} = RegisterDto;
  
  // Eliminamos espacios vacios del DNI
  // Validamos que el campo del DNI haya sido completado.
  // Validamos que el DNI solo tenga números
  // Validamos que el DNI tenga 8 caracteres.
  // Validamos que el DNI ingresado no exista en la bd

  const trimedDNI = dni.trim();

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
    return new Error("El DNI debe tener 8 digitos");
  }

  const existingUser = await findUserByDNI(trimedDNI);
  if (existingUser) {
    return { 
      valid: false,
      status: 409,
      data: { error: 'DNI ya registrado' } };
  }

  // Eliminamos espacios vacios del phone
  // Validamos que el campo phone haya sido completado
  // Validamos que se incluya antes del phone el código de Perú (+51)
  // Validamos que phone empiece con 9
  // Validamos que phone tenga 9 digitos
  // Validamos que phone solo tenga números

  const trimedPhone = phone.trim();
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

  // Eliminamos espacios vacios del email
  // Validamos que el campo del email haya sido completado
  // Validamos que el campo incluya el @
  const trimedEmail = email.trim();

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

  if(!age) {
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
  }

  // Validamos que el campo password haya sido completado
  if(!password) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar una contraseña' }
    };
  }

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
    const {license, plate, insurance_policy, expiration_date } = RegisterDto;

    // Validaciones de la placa y la licencia
    // Validamos que el campo license y plate hayan sido completados
    if(!license || !plate) {
      return {
        valid: false,
        status: 400,
        data: { error: 'Debe ingresar su licencia y placa del vehículo' }
      };
    }

    // Validamos que la licencia tenga el formato correcto (ejemplo: A06702426) y que tenga 9 caracteres
    const licensePattern = /^[A-Z]\d{8}$/;
    if(!licensePattern.test(license)) {
      return {
        valid: false,
        status: 400,
        data: { error: 'La licencia debe tener el formato correcto (ejemplo: A06702426) y 9 caracteres' }
      };
    }

    // Validamos que la placa tenga 7 caracteres (contando el -)
    const plateLength = plate.length;
    if(plateLength != 7) {
      return {
        valid: false,
        status: 400,
        data: { error: 'La placa debe tener 7 caracteres contando el guion (-)' }
      };
    }

    // Validamos que la placa empiece con 2 letras y termine con 6 numeros
    const plateLetters = plate.substring(0,1);
    const plateNumbers = plate.substring(3, 6);

    const plateLettersPattern = /^[a-zA-Z]+$/.test(plateLetters);
    const plateNumbersPattern = /^\d+$/.test(plateNumbers)
    
    if(!plateLettersPattern || !plateNumbersPattern) {
       return {
        valid: false,
        status: 400,
        data: { error: 'La placa debe empezar con 2 letras y terminar con 6 numeros'}
      };
    }

    // Validaciones del seguro de poliza y su fecha de expiracion
    //SOAT-EZ-0670-2025
    if(!insurance_policy) {
      return {
        valid: false,
        status: 400,
        data: { error: 'Debe ingresar su póliza de seguro' }
      };
    }

    const insurancePolicyPattern = /^SOAT-[A-Z]{2}-\d{4}-\d{4}$/;
    if(!insurancePolicyPattern.test(insurance_policy)) {
      return {
        valid: false,
        status: 400,
        data: { error: 'La póliza de seguro debe tener el formato correcto (ejemplo: SOAT-EZ-0670-2025)' }
      };
    }

    if(!expiration_date) {
      return {
        valid: false,
        status: 400,
        data: { error: 'Debe ingresar la fecha de expiración de su póliza de seguro' }
      };
    }
    
    const currentDate = new Date();
    const expDate = new Date(expiration_date);
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

  // Si role == 'PASSENGER' y ha pasado todas las validaciones, @returns {valid = true}


}

