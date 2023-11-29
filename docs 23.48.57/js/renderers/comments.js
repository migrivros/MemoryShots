"use strict";

import { parseHTML } from "../utils/parseHTML.js";


const CommentRenderer = {
    asList: function (comment) {
        let html = `<p><b><a class="class-profile" href="profile.html?userId=${comment.userId}">${comment.firstName} ${comment.lastName}:</a> </b>${comment.text}</p>`;

        let content = parseHTML(html);
        return content;
    }
};

export { CommentRenderer };