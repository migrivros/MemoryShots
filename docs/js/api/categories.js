"use_strict";

import { BASE_URL, requestOptions } from './common.js';

const categoryAPI = {

    getAll: function () {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/categories`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getByPhotoId: function (photoId) {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/photos/${photoId}/categories`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getPhotosById: function (categoryId) {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/photos/category/${categoryId}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getCategoryNameById: function (categoryId) {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/categories/${categoryId}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getCategoryIdByName: function (categoryName) {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/categoryName/${categoryName}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    create: function (formData) { 
        return new Promise(function (resolve , reject) {
            axios
                .post(`${BASE_URL}/categories`, formData , requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    asociate: function (photoId, categoryId) { 
        return new Promise(function (resolve , reject) {
            axios
                .post(`${BASE_URL}/photoCategories/${photoId}/${categoryId}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    delete: function (photoId, categoryId) { 
        return new Promise(function (resolve , reject) {
            axios
                .delete(`${BASE_URL}/photoCategories/${photoId}/${categoryId}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

};

export { categoryAPI };