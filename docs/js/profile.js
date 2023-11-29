"use strict";

import { photoRenderer } from "./renderers/photos.js";
import { profileInfoRenderer } from "./renderers/profile.js";
import { photosAPI } from "./api/photos.js";
import { usersAPI } from "./api/users.js";
import { sessionManager } from "./utils/session.js";
import { messageRenderer } from "./renderers/messages.js";
import { followAPI } from "./api/follows.js";


let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");
let user = sessionManager.getLoggedUser();


function main() {

    // Add the current user 's ID 
    let user = sessionManager.getLoggedUser();
    
    let container = document.querySelector("div.gallery-profile-container div.row"); 

    if(sessionManager.isLogged()){
        photosAPI.getByUser(userId) 
            .then(photos => {
                for(let photo of photos){
                    if(user.userId == userId){
                        let gallery = photoRenderer.asGallery(photo);
                        container.appendChild(gallery);
                    }else{
                        if(photo.visibility == "PÚBLICA"){
                            let gallery = photoRenderer.asGallery(photo);
                            container.appendChild(gallery);
                        }
                    }
                }
            })
            .catch(error => {
                messageRenderer.showWarningMessage("Aún no existen fotos subidas");
                let footer = document.getElementById("footer");
                footer.style.marginTop = "400px";
            });
    }else{
        photosAPI.getByUser(userId) 
            .then(photos => {
                for(let photo of photos){
                    if(photo.visibility == "PÚBLICA"){
                        let gallery = photoRenderer.asGallery(photo);
                        container.appendChild(gallery);
                    }
                }
            })
    }
    
   

    let container2 = document.querySelector("div.container-info-profile"); 

    if(sessionManager.isLogged()){
        if(userId == user.userId){
            let info = profileInfoRenderer.asMyProfile(user);
            container2.appendChild(info);
        }else{
            usersAPI.getById(userId)
                .then(users => {
                    let info = profileInfoRenderer.asUserProfile(users[0]);
                    loadStatus(user.userId, userId);
                    container2.appendChild(info); 
                    let button = document.getElementById("id-btn-follow");
                    button.onclick = follow;
                })
                .catch(error => messageRenderer.showErrorMessage(error)); 
        }
    }else{
        usersAPI.getById(userId)
                .then(users => {
                    let info = profileInfoRenderer.asUserProfile(users[0]);
                    container2.appendChild(info);
                    let followButton = document.getElementById("id-btn-follow"); 
                    followButton.style.display = "none";
                })
                .catch(error => messageRenderer.showErrorMessage(error)); 
    }
    
}

function loadStatus(user1, user2) { 
    followAPI.getStatus(user1, user2)
        .then(status => {
            let button = document.getElementById("id-btn-follow");
            button.style.backgroundColor= "green";
            button.innerText = "Siguiendo";
        })
        .catch(status => {
            let button = document.getElementById("id-btn-follow");
            button.style.backgroundColor= "gray";
            button.innerText = "Seguir";
        });   
}

function follow(event){
    
    let button = event.target;
    
    if(button.innerText == "Seguir"){
        followAPI.follow(user.userId, userId)
            .then(status => {
                button.style.backgroundColor= "green";
                button.innerText = "Siguiendo";
            });
    }else{
        followAPI.unfollow(user.userId, userId) 
            .then(status => {
                button.style.backgroundColor= "gray";
                button.innerText = "Seguir";
            });
    }
}


document.addEventListener("DOMContentLoaded", main);