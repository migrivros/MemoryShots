"use_strict";

import { BASE_URL, requestOptions } from './common.js';

const usersAPI = {
    getById: function (userId) {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/users/${userId}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getByUserName: function (userName) {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/users/name/${userName}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    create: function (formData) { 
        return new Promise(function (resolve , reject) {
            axios
                .post(`${BASE_URL}/users`, formData , requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },
    
    update: function (userId, formData) {
        return new Promise(function (resolve , reject) {
            axios
                .put(`${BASE_URL}/users/${userId}`, formData ,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },
};

export { usersAPI };