"use strict";

import { usersAPI } from "./api/users.js";
import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/users.js";
import { profileInfoRenderer } from "./renderers/profile.js";
import { sessionManager } from "./utils/session.js";


let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");
let currentUser = null;

function main() {

    if (userId !== null) {
        loadCurrentUser(); 
    }

    if(sessionManager.isLogged()){
        if(userId == sessionManager.getLoggedId()){
            let buttonBackContainer = document.querySelector("div.render-back-button"); 
            let button = profileInfoRenderer.asButonEditProfile(userId);
            buttonBackContainer.appendChild(button);
        
            let registerForm = document.getElementById("id-edit-profile-form"); 
            registerForm.onsubmit = handleSubmitRegister;
        }else{
            let head = document.getElementById("id-profile-edit");
            let form = document.getElementById("id-edit-profile-form"); 
            let footer = document.getElementById("footer");
            head.style.display = "none" ;
            form.style.display = "none";
            footer.style.marginTop = "600px";
            messageRenderer.showErrorMessage("No puedes editar un perfil que no es tuyo");
        }
    }else{
        let head = document.getElementById("id-profile-edit");
        let form = document.getElementById("id-edit-profile-form"); 
        let footer = document.getElementById("footer");
        head.style.display = "none" ;
        form.style.display = "none";
        footer.style.marginTop = "600px";
        messageRenderer.showErrorMessage("No estás autorizado para editar el perfil sin haber iniciado sesión") 
    }
    

    
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

    else{
        formData.append("profilePhoto", currentUser.profilePhoto); 
        formData.append("firstName", currentUser.firstName);
        formData.append("lastName", currentUser.lastName);
        formData.append("phoneNumber", currentUser.phoneNumber);
        formData.append("email", currentUser.email);

        usersAPI.update(userId , formData)
            .then(data => messageRenderer.showSuccessMessage("Usuario actualizado, vuelva a iniciar sesión para visualizar los cambios"))
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

function loadCurrentUser() {
    let PhotoInput = document.getElementById("id-edit-photo");
    let FirstNameInput = document.getElementById("id-edit-name");
    let LastNameInput = document.getElementById("id-edit-surname");
    let PhoneInput = document.getElementById("id-edit-tlf");
    let EmailInput = document.getElementById("id-edit-email");

    

    usersAPI.getById(userId) 
        .then(users => {
            currentUser = users [0];
            PhotoInput.value = currentUser.profilePhoto; 
            FirstNameInput.value = currentUser.firstName;
            LastNameInput.value = currentUser.lastName; 
            PhoneInput.value = currentUser.phoneNumber; 
            EmailInput.value = currentUser.email;
    })
    .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);