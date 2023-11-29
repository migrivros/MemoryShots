"use strict";

import { sessionManager } from "./utils/session.js";
import { messageRenderer } from "./renderers/messages.js";
import { HeaderRender } from "./renderers/header.js";
import { usersAPI } from "./api/users.js";
import { categoryAPI } from "./api/categories.js";

function main() { 

    let user = sessionManager.getLoggedUser();

    let headerContainer = document.querySelector("div.div-header-render"); 

    if(sessionManager.isLogged()){
        let header = HeaderRender.asNavBarLogin(user);
        headerContainer.appendChild(header);
    }else{
        let header = HeaderRender.asNavBarGuest();
        headerContainer.appendChild(header);
    }


    showUser();
    addLogoutHandler();
    hideHeaderOptions();

    let searchForm = document.getElementById("search-form"); 
    searchForm.onsubmit = handleSubmitSearch;

}

function showUser() {
    let title = document.getElementById("navbarDesplegableId"); 
    let text;

    if (sessionManager.isLogged()) {
        let firstName = sessionManager.getLoggedUser().firstName;
        let lastName = sessionManager.getLoggedUser().lastName;  
        text = firstName + " " + lastName;
    } else {
        text = "Anonymous";
    }

    title.textContent = text; 
}

function addLogoutHandler() {
    let logoutButton = document.getElementById("id-desplegable-perfil-logout");

    logoutButton.addEventListener("click", function() { 
        sessionManager.logout();
        window.location.href = "login.html";
    }); 
}

function hideHeaderOptions() {
    let headerUser = document.getElementById("navbar-user"); 
    let headerLogin = document.getElementById("navbar-login");
    let headerPost = document.getElementById("navbar-post");

    if (sessionManager.isLogged()) { 
        headerLogin.style.display = "none";
    } else {
        headerUser.style.display = "none"; 
        headerPost.style.display = "none"; 
    } 
}

function handleSubmitSearch(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    formData.append('content-search', form);

    let search = formData.get("search");

    if(search.includes("@")){
        usersAPI.getByUserName(search.slice(1))
        .then(users =>  {
            let userId = users[0].userId;
            window.location.href = "profile.html?userId=" + userId;
        })
        .catch(error => messageRenderer.showErrorMessage("No se encuentran resultados para la búsqueda"));
    }
    else if(search.includes("#")){
        categoryAPI.getCategoryIdByName(search.slice(1))
        .then(categories =>  {
            let categoryId = categories[0].categoryId;
            window.location.href = "search-category.html?categoryId=" + categoryId;
        })
        .catch(error => messageRenderer.showErrorMessage("No se encuentran resultados para la búsqueda"));
    }else{
        messageRenderer.showErrorMessage('Por favor, para buscar un usuario escriba "@" seguido del usuario, y para buscar una categoría "#" seguida de la categoría')
    }

    
}

document.addEventListener("DOMContentLoaded", main);
