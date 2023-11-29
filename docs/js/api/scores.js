"use_strict";

import { BASE_URL, requestOptions } from './common.js';

const scoreAPI = {
    getByPhotoId: function (photoId) {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/photos/${photoId}/score`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    score: function (formData) { 
        return new Promise(function (resolve , reject) {
            axios
                .post(`${BASE_URL}/scores`, formData, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },
};

export { scoreAPI };