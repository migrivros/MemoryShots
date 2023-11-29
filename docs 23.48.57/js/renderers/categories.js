"use strict";

import { parseHTML } from "../utils/parseHTML.js";


const categoryRenderer = {
    asTitle: function (category) {
        let html = `<div>
                        <h2 class="class-titles2">
                        <strong>Publicaciones globales relacionadas con: #${category.categoryName}</strong>
                        </h2><br>
                    </div>`;

        let cat = parseHTML(html);
        return cat;
    },

    asList: function (category) {
        let html = `<a href="search-category.html?categoryId=${category.categoryId}">#${category.categoryName} </a>`;

        let info = parseHTML(html);
        return info;
    },

    asSelect: function (category) {
        let html = `<option value="${category.categoryName}">${category.categoryName}</option>`;

        let info = parseHTML(html);
        return info;
    }
};

export { categoryRenderer };