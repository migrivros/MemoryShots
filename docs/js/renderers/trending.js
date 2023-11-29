"use strict";

import { parseHTML } from "../utils/parseHTML.js";


const trendListRender = {

    asListCategories: function (category) {
        let html = `<a class="class-trends-font" href="search-category.html?categoryId=${category.categoryId}"><li class="list-group-item">#${category.categoryName} (${category.nPhotos})</li></a>`;

        let info = parseHTML(html);
        return info;
    },

    asListUsers: function (user) {
        let html = `<a class="class-trends-font" href="profile.html?userId=${user.userId}"><li class="list-group-item">${user.firstName} ${user.lastName} (${user.nFollow} 👤)</li></a>`;

        let info = parseHTML(html);
        return info;
    },

    asListUsersScore: function (user) {
        let html = `<a class="class-trends-font" href="profile.html?userId=${user.userId}"><li class="list-group-item">${user.firstName} ${user.lastName} (${user.mediumValue}☆)</li></a>`;

        let info = parseHTML(html);
        return info;
    }
};

export { trendListRender };