"use strict";

import { photosAPI } from "./api/photos.js";
import { photoRenderer } from "./renderers/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let user = sessionManager.getLoggedUser();

function main() {

    let photoContainer = document.querySelector("div.class-photo-preview");

    if(sessionManager.isLogged()){
        photosAPI.getById(photoId) 
        .then(photos => {
            if(photos[0].userId == user.userId){
                let photoDetails = photoRenderer.asMyPhotoPreview(photos[0]);
                photoContainer.appendChild(photoDetails); 
                let deleteBtn = document.querySelector("#button-delete");
                deleteBtn.onclick = handleDelete;
                let editBtn = document.querySelector("#button-edit");
                editBtn.onclick = handleEdit;
            }else{
                let photoDetails = photoRenderer.asUserPhotoPreview(photos[0]);
                photoContainer.appendChild(photoDetails);
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    }else{
        photosAPI.getById(photoId) 
        .then(photos => {
            let photoDetails = photoRenderer.asUserPhotoPreview(photos[0]);
            photoContainer.appendChild(photoDetails);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    }
    
    
}

function handleDelete(event) {
    let answer = confirm("¿Desea eliminar la foto definitivamente?");

    if (answer) { 
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html") 
            .catch(error => messageRenderer.showErrorMessage(error));
    } 
}

function handleEdit(event) {
    window.location.href = "edit-post.html?photoId=" + photoId;
};

document.addEventListener("DOMContentLoaded", main);