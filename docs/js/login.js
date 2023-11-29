"use strict";

import { sessionManager } from "./utils/session.js";
import { messageRenderer } from "./renderers/messages.js";
import { authAPI } from "./api/auth.js";

function main() {

    let loginForm = document.getElementById("form-login-user"); 
    loginForm.onsubmit = handleSubmitLogin;
}

function handleSubmitLogin(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    authAPI.login(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user; 
            sessionManager.login(sessionToken , loggedUser); 
            window.location.href = "index.html";
        })
        .catch(error => {
            if(error.includes("is not correct")){
                messageRenderer.showErrorMessage("La contraseña no es correcta");
            }else if(error.includes("not found")){
                messageRenderer.showErrorMessage("El usuario no ha sido encontrado");
            }else{
                messageRenderer.showErrorMessage(error);
            }
        });
}  

document.addEventListener("DOMContentLoaded", main);