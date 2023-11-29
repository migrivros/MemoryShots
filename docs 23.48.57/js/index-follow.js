"use strict";

import { photoRenderer } from "./renderers/photos.js";
import { photosAPI } from "./api/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";


function main() {

    let followOption = document.getElementById("id-follow-option");

    if(!sessionManager.isLogged()){
        followOption.style.display = "none";
    } 

    let userId = sessionManager.getLoggedId();

    let galleryContainer = document.querySelector("div.gallery-container"); 

    photosAPI.getAllMyFollows(userId)
        .then(photos => {
            for(let photo of photos){
                if(photo.visibility === "PÚBLICA"){
                    let gallery = photoRenderer.asCard(photo);
                    galleryContainer.appendChild(gallery);
                } 
            }
        })
        .catch(error => {
            let footer = document.getElementById("footer"); 
            footer.style.marginTop = "500px";
            messageRenderer.showWarningMessage("No estás siguiendo a ningún usuario para ver sus fotos. Puedes seguirlos desde su perfil, ¡anímate!");
        });
}

document.addEventListener("DOMContentLoaded", main);
