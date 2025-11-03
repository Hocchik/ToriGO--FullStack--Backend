class RegisterUserDTO {
    constructor(user) {
        this.full_name = user.full_name;
        this.dni = user.dni;
        this.age = user.age;
        this.email = user.email;
        this.phone = user.phone;
        this.password = user.password;
        this.role = user.role;
    }
}
// Se puede borrar este archivo si no se usa