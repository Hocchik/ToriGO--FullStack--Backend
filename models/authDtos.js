export class User {
  constructor({ id, full_name, dni, phone, age, email, password, role }) {
    this.id = id;
    this.full_name = full_name;
    this.dni = dni;
    this.phone = phone;
    this.email = email;
    this.age = age;
    this.password = password;
    this.role = role;
  }
}

export class LoginDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterDto {
  constructor({ full_name, dni, phone, age, email, password, role }) {
    this.full_name = full_name; //Nombre completo
    this.dni = dni; // Documento de identidad unico
    this.phone = phone;
    this.email = email; // Correo electronico
    this.age = age; // Edad numero
    this.password = password; // Contraseña
    this.role = role; // Rol del usuario
  }
}