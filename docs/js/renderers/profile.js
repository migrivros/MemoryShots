"use strict";

import { parseHTML } from "../utils/parseHTML.js";


const profileInfoRenderer = {
    asMyProfile: function (user) {
        let html = `<div>
                    <img class="class-profile" src="${user.profilePhoto}" width="60px" height="60px">
                    <h4><b>Mi perfil </b><a href="edit-profile.html?userId=${user.userId}"><img src="./images/edit.png" width="20px"></a></h4>
                    <h5>@${user.userName}</h5>
                    <a>${user.email}</a>
                    </div>`;


        let info = parseHTML(html);
        return info;
    },

    asUserProfile: function (user) {
        let html = `<div>
                    <img class="class-profile" src="${user.profilePhoto}" width="60px" height="60px">
                    <h4><b>${user.firstName} ${user.lastName}  </b><button type="button" id="id-btn-follow" class="btn btn-secondary"></button></h4>
                    <h5>@${user.userName}</h5>
                    <a>${user.email}</a>
                    </div>`;


        let info = parseHTML(html);
        return info;
    },

    asButonEditProfile: function(userId) {
        let html = `<a class="btn btn-dark" href="profile.html?userId=${userId}">Volver</a>`;

        let button = parseHTML(html);
        return button;
    }
};

export { profileInfoRenderer };