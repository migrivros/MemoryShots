"use_strict";

import { BASE_URL, requestOptions } from './common.js';

const followAPI = {
    getStatus: function (user1, user2) {
        return new Promise(function (resolve , reject) { 
            axios
                .get(`${BASE_URL}/follow/${user1}/${user2}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    follow: function (user1, user2) {
        return new Promise(function (resolve , reject) { 
            axios
                .post(`${BASE_URL}/follow/${user1}/${user2}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    },

    unfollow: function (user1, user2) {
        return new Promise(function (resolve , reject) { 
            axios
                .delete(`${BASE_URL}/unfollow/${user1}/${user2}`, requestOptions) 
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        }); 
    }

};

export { followAPI };