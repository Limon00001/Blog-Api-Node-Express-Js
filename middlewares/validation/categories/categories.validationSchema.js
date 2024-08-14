const Joi = require("joi");

// Schema
const categorySchema = Joi.object({
    name: Joi.string().min(2).regex(/^[A-Za-z\s]+$/).trim().required().lowercase().messages({
        'string.base': 'Category should be alphabetic name',
        'string.empty': 'Category cannot be empty',
        'string.min': 'Category must be at least 2 character long',
        'any.required': 'Category is required',
        'string.pattern.base': 'Category can not contain any number',
    })
})

// Export Schema
module.exports = { categorySchema };
