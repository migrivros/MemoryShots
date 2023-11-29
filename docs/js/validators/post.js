"use strict";

const postValidator = {
    validateCorrectPost: function (formData) { 
    
        let errors = [];

        let title = formData.get("title");
        
        if (title.length < 5) {
            errors.push("El título debe tener, al menos, 5 caracteres");
        }

        return errors;
    } 
};

export { postValidator };