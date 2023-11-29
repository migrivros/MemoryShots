"use strict";

import { categoryRenderer } from "./renderers/categories.js";
import { CommentRenderer } from "./renderers/comments.js";
import { photosAPI } from "./api/photos.js";
import { photoRenderer } from "./renderers/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { categoryAPI } from "./api/categories.js";
import { commentAPI } from "./api/comments.js";
import { ScoreRender } from "./renderers/scores.js";
import { scoreAPI } from "./api/scores.js";
import { sessionManager } from "./utils/session.js";
import { wordAPI } from "./api/words.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {

    let photoContainer = document.querySelector("div.render-image-comments");
    photosAPI.getById(photoId) 
        .then(photos => {
            let photoDetails = photoRenderer.asPhotoComment(photos[0]);
            photoContainer.appendChild(photoDetails); 
        })
        .catch(error => messageRenderer.showErrorMessage(error)); 
    
        
    let containerCategories = document.querySelector("div.render-categories-photo"); 
    categoryAPI.getByPhotoId(photoId)
        .then(categories => {
            if(categories.length > 0){
                for(let category of categories){
                    let cat = categoryRenderer.asList(category);
                    containerCategories.appendChild(cat);
                }
            }else{
                containerCategories.textContent = "Sin categorías";
            }
            
        })
        .catch(error => messageRenderer.showErrorMessage(error)); 

    let addCommentForm = document.getElementById("form-add-comment"); 
    addCommentForm.onsubmit = handleSubmitComment;

    let containerComment = document.querySelector("div.class-coments-box"); 
    commentAPI.getByPhotoId(photoId)
        .then(comments => {
            for(let comment of comments){
                let content = CommentRenderer.asList(comment);
                containerComment.appendChild(content);   
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    
    let containerScore = document.querySelector("div.render-score-value");
    photosAPI.getById(photoId) 
        .then(photos => {
            let content = ScoreRender.asValue(photos[0]);
            containerScore.appendChild(content);

            let containerSelect = document.querySelector(".form-add-category-select");
            categoryAPI.getAll()
                .then(categories => {
                    for(let category of categories){
                        let content = categoryRenderer.asSelect(category);
                        containerSelect.appendChild(content);
                    }
                })
                .catch(error => messageRenderer.showErrorMessage(error));

            //let addCategoryForm = document.getElementById("form-add-category"); 
            //addCategoryForm.onsubmit = handleAsociateCategory;

            let addCategoryForm2 = document.getElementById("form-add-category-select"); 
            addCategoryForm2.onsubmit = handleAsociateCategory;

            let deleteCategoryForm = document.getElementById("form-delete-category"); 
            deleteCategoryForm.onsubmit = handleNoAsociateCategory;

            let newCategoryForm = document.getElementById("form-create-category"); 
            newCategoryForm.onsubmit = handleSubmitCategory;

            let newScoreForm = document.getElementById("form-put-score"); 
            newScoreForm.onsubmit = handleSubmitScore;
        })
        .catch(error => messageRenderer.showErrorMessage(error)); 

}

function handleSubmitCategory(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    categoryAPI.create(formData)
        .then(data => window.location.href = "comments.html?photoId=" + photoId) 
        .catch(error => {
            if(sessionManager.isLogged()){
                messageRenderer.showErrorMessage("La categoría que desea crear ya existe");
            }else{
                messageRenderer.showErrorMessage("Inicie sesión para crear una nueva categoría");
            }
        });
}

function handleAsociateCategory(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let categoryName = formData.get("categoryName");

    if(sessionManager.isLogged()){
        categoryAPI.getCategoryIdByName(categoryName)
        .then(categories =>  {
            let categoryId = categories[0].categoryId;
            categoryAPI.asociate(photoId, categoryId)
                .then(data => window.location.href = "comments.html?photoId=" + photoId) 
                .catch(error => messageRenderer.showErrorMessage("error"));
        })
        .catch(error => messageRenderer.showErrorMessage("Categoría no encontrada, créela primero"));
    }else{
        messageRenderer.showErrorMessage("Inicie sesión para agregar una categoría a una foto")
    }
}

function handleNoAsociateCategory(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let categoryName = formData.get("categoryName");

    categoryAPI.getCategoryIdByName(categoryName)
        .then(categories =>  {
            let categoryId = categories[0].categoryId;
            categoryAPI.delete(photoId, categoryId)
                .then(data => window.location.href = "comments.html?photoId=" + photoId) 
                .catch(error => messageRenderer.showErrorMessage("Inicie sesión para eliminar una categoría a una foto"));
        })
        .catch(error => messageRenderer.showErrorMessage("No existe esa categoría"));
}

function handleSubmitScore(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    formData.append("photoId", photoId);

    // Add the current user 's ID 
    let user = sessionManager.getLoggedId();
    formData.append("userId", user);

    scoreAPI.score(formData)
        .then(data => window.location.href = "comments.html?photoId=" + photoId) 
        .catch(error => {
            if(!sessionManager.isLogged()){
                messageRenderer.showErrorMessage("Inicie sesión para puntuar una foto");
            }else{
                messageRenderer.showErrorMessage("No puedes valorar la foto más de una vez");
            }
        });
            
}

function handleSubmitComment(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    formData.append("photoId", photoId);

    // Add the current user 's ID 
    let user = sessionManager.getLoggedId();
    formData.append("userId", user);

    let res = false;

    wordAPI.getAll()
        .then(words => {
            let ls = [];
            for(let word of words){
                if(formData.get("text").toLowerCase().includes(word.word)){
                    res = true;
                    ls.push(' "' + word.word + '"');
                }
            }
            if(!res){
                commentAPI.create(formData)
                    .then(data => window.location.href = "comments.html?photoId=" + photoId) 
                    .catch(error => messageRenderer.showErrorMessage("Inicie sesión para comentar una foto"));
            }
            else{
                if(ls.length > 1){
                    messageRenderer.showErrorMessage("Su comentario contiene las palabras inapropiadas: " + ls + ".   Elimínelas por favor")
                }else{
                    messageRenderer.showErrorMessage("Su comentario contiene la palabra inapropiada: " + ls + ".  Elimínela por favor")
                }
                
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    
}



document.addEventListener("DOMContentLoaded", main);
