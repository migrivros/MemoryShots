"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { postValidator } from "./validators/post.js";
import { photosAPI } from "./api/photos.js";
import { sessionManager } from "./utils/session.js";
import { wordAPI } from "./api/words.js";


function main() {


    let registerForm = document.getElementById("id-new-post-form"); 
    registerForm.onsubmit = handleSubmitPhoto;

    document.getElementById('id-post-photo').addEventListener("change", function(){ 
        document.getElementById('prevImage').src=this.value;
    });

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

    if(errors.length == 0){
        // Add the current user 's ID 
        let user = sessionManager.getLoggedId();
        formData.append("userId", user);

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
                photosAPI.create(formData)
                    .then(data => window.location.href = "index.html")
                    .catch(error => {
                        if(formData.get("visibility") == undefined){
                            messageRenderer.showErrorMessage("Por favor, marque la visibilidad de la foto")
                        }else if(sessionManager.isLogged() && formData.get("description").length >= 80){
                            messageRenderer.showErrorMessage("La descripción no puede tener más de 80 caracteres")
                        }else if(!sessionManager.isLogged()){
                            messageRenderer.showErrorMessage("Debes iniciar sesión para subir una foto")
                        }
                        else{
                            messageRenderer.showErrorMessage(error);

                        }
                    });
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

document.addEventListener("DOMContentLoaded", main);