"use strict";

import { photoRenderer } from "./renderers/photos.js";
import { trendListRender } from "./renderers/trending.js";
import { messageRenderer } from "./renderers/messages.js";
import { trendAPI } from "./api/trends.js";


function main() {

    let containerLike = document.querySelector("div.trends-photo-render-like"); 

    trendAPI.getByScore()
        .then(photos => {
            for(let photo of photos){
                    let gallery = photoRenderer.asTrends(photo);
                    containerLike.appendChild(gallery);  
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));


    let containerComment = document.querySelector("div.trends-photo-render-comment"); 

    trendAPI.getByComment()
        .then(photos => {
            for(let photo of photos){
                    let gallery = photoRenderer.asTrends(photo);
                    containerComment.appendChild(gallery);  
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    

    let containerCategory = document.getElementById("category-render");

    trendAPI.getCategories()
        .then(categories => {
            for(let category of categories){
                    let cat = trendListRender.asListCategories(category);
                    containerCategory.appendChild(cat);  
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    

    let containerFollow = document.getElementById("follow-render");

    trendAPI.getUserFollowed()
        .then(users => {
            for(let user of users){
                    let info = trendListRender.asListUsers(user);
                    containerFollow.appendChild(info);  
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    

    let containerScore = document.getElementById("score-render");
    
    trendAPI.getUserBestScore()
    .then(elements => {
        for(let element of elements){
            if(element.visibility == "PÚBLICA"){
                let info = trendListRender.asListUsersScore(element);
                containerScore.appendChild(info);
            }  
        }
    })
    .catch(error => messageRenderer.showErrorMessage(error));
    
}


document.addEventListener("DOMContentLoaded", main);