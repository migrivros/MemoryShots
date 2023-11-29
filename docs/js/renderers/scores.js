"use strict";

import { scoreAPI } from "../api/scores.js";
import { parseHTML } from "../utils/parseHTML.js";


const ScoreRender = {
    asValue: function (photo) {
        let html = `<div>
                        <br><form action="" id="form-add-category-select">
                            <select class="form-add-category-select" id="id-add-category-select" name="categoryName"></select>
                            <button type="submit" class="btn btn-success">Añadir Categoría</button>
                        </form>

                        <form action="" id="form-delete-category">
                            <input type="text" class="form-add-category" id="id-delete-category" name="categoryName" placeholder="..." required>
                            <button type="submit" class="btn btn-danger">Eliminar Categoría</button>
                        </form>
                        <form action="" id="form-create-category">
                            <input type="text" class="form-add-category" id="id-create-category" name="categoryName" placeholder="..." required>
                            <button type="submit" class="btn btn-primary">Crear nueva Categoría</button>
                        </form>
                        <form id="form-put-score">
                            <div class="form-group">
                                <label for="rating-input"><b>Tu valoración: </b></label>
                                <select id="rating-input" name="value" class="form-control-2">
                                    <option value="1">☆</option>
                                    <option value="2">☆☆</option>
                                    <option value="3">☆☆☆</option>
                                    <option value="4">☆☆☆☆</option>
                                    <option value="5">☆☆☆☆☆</option>
                                </select><br><br>
                                <button type="submit" class="btn btn-success">Puntuar</button>
                            </div>
                        </form><br><br>
                        <div class="render-score-value"> </div>
                        <p><b>Valoración Media: </b><h4><p class="photo-score"> </p></h4></p>
                    </div>`;

        let content = parseHTML(html);
        loadPhotoRating(content, photo.photoId);
        return content;
    }
};

function loadPhotoRating(content, photoId) {
    scoreAPI.getByPhotoId(photoId)
        .then(score => {
            let value = score[0].value;
            let p = content.querySelector("p.photo-score");
            
            if(value == null) {
                p.textContent = "No existen valoraciones";
            }else{
                p.textContent = value + " / 5";
            }
        });
}

export { ScoreRender };