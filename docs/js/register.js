"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/users.js";
import { authAPI } from "./api/auth.js";
import { sessionManager } from "./utils/session.js";


function main() {

    let registerForm = document.getElementById("id-register-form"); 
    registerForm.onsubmit = handleSubmitRegister;
}

function handleSubmitRegister(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let errors = userValidator.validateCorrectUser(formData);
        
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors"); 
        errorsDiv.innerHTML = "";

        for (let error of errors) { 
            messageRenderer.showErrorMessage(error);
        }
    }

    if(errors.length == 0){
        sendRegister(formData)
    }
}

function sendRegister(formData) { 
    authAPI.register(formData)
        .then(loginData => window.location.href = "login.html")
        .catch(error => {
            if(error.includes("There already exists another user with that email")){
                messageRenderer.showErrorMessage("Ya existe una cuenta con esa dirección de correo electrónico")
            }else if(error.includes("Duplicate entry") && error.includes("userName")){
                messageRenderer.showErrorMessage("El nombre de usuario ya se encuentra en uso")
            }else if(error.includes("Duplicate entry") && error.includes("firstName")){
                messageRenderer.showErrorMessage("El nombre y los apellidos ya se encuentran registrados")
            }else if(error.includes("Duplicate entry") && error.includes("phoneNumber")){
                messageRenderer.showErrorMessage("El número de telefono ya se encuentra en uso")
            }else{
                messageRenderer.showErrorMessage(error)
            }
        });
}

document.addEventListener("DOMContentLoaded", main);