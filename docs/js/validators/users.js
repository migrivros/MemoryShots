"use strict";

const userValidator = {
    validateCorrectUser: function (formData) { 
    
        let errors = [];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let userName = formData.get("userName");
        let password = formData.get("password");
        let password2 = formData.get("password2");

        if (firstName.length < 3 || lastName.length < 3) {
            errors.push("El nombre y apellidos deben estar formados, como mínimo, por 3 caracteres");
        }
        
        if(userName !== null){
            if(userName.length < 5) {
                errors.push("El nombre de usuario debe estar formado, como mínimo, por 5 caracteres")
            }
        }
        
        if(password !== null && password2 !== null){
            if(password.length < 6) {
                errors.push("La contraseña debe tener una longitud minima de 6 caracteres para garantizar su seguridad");
            }
    
            if(password !== password2) {
                errors.push("Las contraseñas deben de coincidir");
            }
        }

        return errors;
    } 
};

export { userValidator };