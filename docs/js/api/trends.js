"use_strict";

import { BASE_URL, requestOptions } from './common.js';

const trendAPI = {
    getByScore: function () {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/trendsScore`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getByComment: function () {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/trendsComment`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getCategories: function () {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/trendCategories`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getUserFollowed: function () {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/trendFollows`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    getUserBestScore: function () {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/trendBestUserScore`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },
};

export { trendAPI };