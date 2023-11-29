"use strict";

import { parseHTML } from "../utils/parseHTML.js";
import { usersAPI } from "../api/users.js";


const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class="class-gallery-container">
                        <a href="profile.html?userId=${photo.userId}" class="class-profile"></a>
                        <br>
                        <div class="class-photo-block">
                                <div class="class-photo-image-block">
                                    <a class="class-img-hover" href="comments.html?photoId=${photo.photoId}"><img class="class-photo-image" src="${photo.photoURL}" alt="${photo.description}"></a> 
                                </div>
                                <div>
                                    <p class="class-photo-description"><b>"${photo.title}"</b></p>
                                    <p class="class-photo-description">${photo.description}</p>
                                </div>  
                        </div>
                    </div>`;


        let card = parseHTML(html); 
        loadUsername(card, photo.userId);
        return card;
    },

    asGallery: function (photo) {
        let html = `<div class="col-md-4 class-photo-profile">
                    <a href="photo-preview.html?photoId=${photo.photoId}" class="class-img-hover">
                        <li class="list-group-item class-photo-profile"><img src="${photo.photoURL}" alt="${photo.description}"></li>
                    </a>
                    </div>`;


        let gallery = parseHTML(html);
        return gallery;
    },
    
    asUserPhotoPreview: function (photo) {
        let html = `<div>
                        <a href="profile.html?userId=${photo.userId}" class="class-profile"></a>
                        <br>
                        <div class="class-photo-block2">
                            <div class="class-photo-image-block2">
                                <a class="class-img-hover" href="comments.html?photoId=${photo.photoId}"><img class="class-photo-image" src="${photo.photoURL}" alt="${photo.description}"></a> 
                            </div>
                            <div>
                                <p class="class-photo-description">${photo.title}</p>
                                <p class="class-photo-description">${photo.description}</p>
                            </div> 
                        </div>
                        <div class="container text-center">
                            <a href="profile.html?userId=${photo.userId}"><button type="button" class="btn btn-secondary">Volver</button></a>
                        </div>
                    </div>`;


        let preview = parseHTML(html);
        loadUsername(preview, photo.userId);
        return preview;
    },
    

    asMyPhotoPreview: function (photo) {
        let html = `<div>
                        <div class="container" id="errors"></div>
                        <a href="profile.html?userId=${photo.userId}" class="class-profile"></a>
                        <br>
                        <div class="class-photo-block2">
                            <div class="class-photo-image-block2">
                                <a class="class-img-hover" href="comments.html?photoId=${photo.photoId}"><img class="class-photo-image" src="${photo.photoURL}" alt="${photo.description}"></a> 
                            </div>
                            <div>
                                <p class="class-photo-description">${photo.title}</p>
                                <p class="class-photo-description">${photo.description}</p>
                            </div> 
                        </div>
                        <div class="container text-center">
                            <a id="button-edit" href="edit-post.html?photoId=${photo.photoId}"><button type="button" class="btn btn-success">Modificar</button></a>
                            <button id="button-delete" type="button" class="btn btn-danger">Eliminar</button>
                            <a href="profile.html?userId=${photo.userId}"><button type="button" class="btn btn-secondary mt-1">Volver</button></a>
                        </div>
                    </div>`;


        let preview = parseHTML(html);
        loadUsername(preview, photo.userId);
        return preview;
    },

    asTrends: function (photo) {
        let html = `<div class="col-md-2">
                    <a class="class-hover-trends" href="photo-preview.html?photoId=${photo.photoId}"><img class="col-md" src="${photo.photoURL}" alt="${photo.description}" width="auto" height="80px"></a>
                    </div>`;


        let trends = parseHTML(html);
        return trends;
    },

    asPhotoComment: function (photo) {
            let html = `<div>
                            <div class="container">
                                <br><a href="profile.html?userId=${photo.userId}" class="class-profile"></a>
                            </div><br><br>
                            <img class="class-image-comment" src="${photo.photoURL}" alt="${photo.description}" width="auto" height="80px">
                            <p class="container"><b>Fecha:</b> ${(photo.uploadDate).substring(0,16)}</p><br>
                        </div>`;


        let miniPhoto = parseHTML(html);
        loadUsername(miniPhoto, photo.userId);
        return miniPhoto;
    },

    asPhotoEdit: function (photo) {
        let html = `<img class="class-image-edit" src="${photo.photoURL}" alt="${photo.description}" width="auto" height="80px"><br>`;

        let miniPhoto = parseHTML(html);
        return miniPhoto;
    },

    asPhotoEditButton: function (photo) {
        let html = `<a href="photo-preview.html?photoId=${photo.photoId}"><button type="button" class="btn btn-secondary">Volver</button></a>`;

        let button = parseHTML(html);
        return button;
    }
    
};

function loadUsername(card, userId) { 
    usersAPI.getById(userId)
        .then(users => {
            let name = users [0].firstName;
            let surname = users [0].lastName;
            let p = card.querySelector("a.class-profile"); 
            p.textContent = name + " " + surname;
        }); 
}

export { photoRenderer };