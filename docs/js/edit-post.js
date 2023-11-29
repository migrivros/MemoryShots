"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { postValidator } from "./validators/post.js";
import { photoRenderer } from "./renderers/photos.js";
import { photosAPI } from "../js/api/photos.js";
import { wordAPI } from "./api/words.js";
import { sessionManager } from "./utils/session.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {

    if (photoId !== null) {
        loadCurrentPhoto(); 
    }

    let registerForm = document.getElementById("id-edit-post-form"); 
    registerForm.onsubmit = handleSubmitPhoto;

    let photoContainer = document.querySelector("div.render-image-edit-post");

    if(sessionManager.isLogged()){
        photosAPI.getById(photoId) 
            .then(photos => {
                if(photos[0].userId == sessionManager.getLoggedId()){
                    let photoDetails = photoRenderer.asPhotoEdit(photos[0]);
                    photoContainer.appendChild(photoDetails); 
                    let button = document.querySelector("a.button-back-preview");
                    photosAPI.getById(photoId)
                        .then(photos => {
                            let b = photoRenderer.asPhotoEditButton(photos[0]);
                            button.appendChild(b); 
                        })
                        .catch(error => messageRenderer.showErrorMessage(error));
                }else{
                    let form = document.getElementById("id-edit-post-form"); 
                    let footer = document.getElementById("footer"); 
                    form.style.display = "none";
                    footer.style.marginTop = "500px";
                    messageRenderer.showErrorMessage("No puedes editar una foto que no es tuya")
                }
            })
            .catch(error => messageRenderer.showErrorMessage(error));
    }else{
        let form = document.getElementById("id-edit-post-form"); 
        let footer = document.getElementById("footer"); 
        form.style.display = "none";
        footer.style.marginTop = "600px";
        messageRenderer.showErrorMessage("No estás autorizado para editar una foto sin haber iniciado sesión")
    }

    
}

function handleSubmitPhoto(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let errors = postValidator.validateCorrectPost(formData);
        
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors"); 
        errorsDiv.innerHTML = "";

        for (let error of errors) { 
            messageRenderer.showErrorMessage(error);
        }
    } 

    else{
        formData.append("userId", currentPhoto.userId); 
        formData.append("uploadDate", currentPhoto.uploadDate);
        formData.append("photoURL", currentPhoto.photoURL);

        let res1 = false;
        let res2 = false;

        wordAPI.getAll()
        .then(words => {
            let ls = [];
            for(let word of words){
                if(formData.get("title").toLowerCase().includes(word.word)){
                    res1 = true;
                    ls.push(' "' + word.word + '"');
                }
                if(formData.get("description").toLowerCase().includes(word.word)){
                    res2 = true;
                    ls.push(' "' + word.word + '"');
                }
            }
            if(!res1 && !res2){
                photosAPI.update(photoId , formData)
                    .then(data => window.location.href = "photo-preview.html?photoId=" + photoId) 
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
            else if (res1 && res2){
                if(ls.length > 1){
                    messageRenderer.showErrorMessage("El título y la descripción contienen las palabras inapropiadas: " + ls + ". Elimínelas por favor");
                }else{
                    messageRenderer.showErrorMessage("El título y la descripción contienen la palabra inapropiada: " + ls + ". Elimínela por favor");
                }   
            }
            else if(res1){
                if(ls.length > 1){
                    messageRenderer.showErrorMessage("El título contiene las palabras inapropiadas: " + ls + ". Elimínelas por favor");
                }else{
                    messageRenderer.showErrorMessage("El título contiene la palabra inapropiada: " + ls + ". Elimínela por favor");
                }              }
            else{
                if(ls.length > 1){
                    messageRenderer.showErrorMessage("La descripción contiene las palabras inapropiadas: " + ls + ". Elimínelas por favor");
                }else{
                    messageRenderer.showErrorMessage("La descripción contiene la palabra inapropiada: " + ls + ". Elimínela por favor");
                }             
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    }
}

function loadCurrentPhoto() {
    let titleInput = document.getElementById("id-post-title");
    let descriptionInput = document.getElementById("id-post-description"); 
    let visibilityInput = document.getElementById("id-post-visibility");
    

    photosAPI.getById(photoId) 
        .then(photos => {
            currentPhoto = photos [0];
            titleInput.value = currentPhoto.title; 
            descriptionInput.value = currentPhoto.description; 
            visibilityInput.value = currentPhoto.visibility;
    })
    .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);