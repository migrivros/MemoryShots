"use strict";

import { photoRenderer } from "./renderers/photos.js";
import { photosAPI } from "../js/api/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";

function main() {

    let followOption = document.getElementById("id-follow-option");

    if(!sessionManager.isLogged()){
        followOption.style.display = "none";
    } 


    let galleryContainer = document.querySelector("div.gallery-container"); 

    photosAPI.getAll() 
        .then(photos => {
            for(let photo of photos){
                if(photo.visibility === "PÚBLICA"){
                    let gallery = photoRenderer.asCard(photo);
                    galleryContainer.appendChild(gallery);
                } 
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);
