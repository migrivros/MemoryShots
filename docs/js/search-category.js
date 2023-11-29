"use strict";

import { categoryRenderer } from "./renderers/categories.js";
import { photoRenderer } from "./renderers/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { categoryAPI } from "./api/categories.js";


let urlParams = new URLSearchParams(window.location.search);
let categoryId = urlParams.get("categoryId");

function main() {

    let containerCategory = document.querySelector("div.titles-category-render"); 
    categoryAPI.getCategoryNameById(categoryId)
        .then(category => {
            let cat = categoryRenderer.asTitle(category[0]);
            containerCategory.appendChild(cat);
        })
        .catch(error => messageRenderer.showErrorMessage(error));



    let galleryContainer = document.querySelector("div.gallery-container"); 
    categoryAPI.getPhotosById(categoryId) 
        .then(photos => {
            for(let photo of photos){
                if(photo.visibility === "PÚBLICA"){
                    let gallery = photoRenderer.asCard(photo);
                    galleryContainer.appendChild(gallery);
                } 
            }
        })
        .catch(error => {
            messageRenderer.showWarningMessage("No existen fotos con esta categoría asociada");
            let footer = document.getElementById("footer");
            footer.style.marginTop = "600px";
        });
}

document.addEventListener("DOMContentLoaded", main);
