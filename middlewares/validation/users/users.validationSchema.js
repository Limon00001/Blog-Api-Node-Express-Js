const Joi = require("joi");

// Schema
const userRegistrationSchema = Joi.object({
    firstName: Joi.string().pattern(/^[a-zA-Z0-9\s-]+$/).min(3).max(20).required().trim().messages({
        'any.required': 'First name must be required.',
        'string.empty': 'First name can not be empty.',
        'string.min': 'First name should be at least 3 characters long.',
        'string.max': 'First name should not be more than 20 characters long.',
        'string.pattern.base': 'First name should only contain alphanumeric characters.',
    }),
    lastName: Joi.string().alphanum().min(3).max(20).required().trim().messages({
        'any.required': 'Last name must be required.',
        'string.empty': 'Last name can not be empty.',
        'string.min': 'Last name should be at least 3 characters long.',
        'string.max': 'Last name should not be more than 20 characters long.',
        'string.alphanum': 'Last name should only contain alphanumeric characters.',
    }),
    password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).min(8).max(16).required().trim().messages({
        'any.required': 'Password must be required.',
        'string.empty': 'Password can not be empty.',
        'string.pattern.base': 'Password must contain one digit, one lowercase letter, one uppercase letter, one special character and it must be 8-16 characters long.',
    }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Password does not match',
            'string.empty': 'Password is required',
        }),
    email: Joi.string().email().required().lowercase().trim().messages({
        'any.required': 'Email must be required.',
        'string.empty': 'This field can not be empty.',
        'string.email': 'Invalid email format.',
    }),
    mobile: Joi.string().length(11).pattern(/^(?:\+88|88)?(01[3-9]\d{8})$/).trim().messages({
        'any.required': 'Name must be required.',
        'string.empty': 'Phone number can not be empty.',
        'string.length': 'Phone number must be at least 11 characters long.',
        'string.pattern.base': 'Phone number is invalid.'
    }),
    role: Joi.string().valid('admin', 'user').trim().default('user').messages({
        'any.required': 'Please select your field.'
    }),
})

const userLogginSchema = Joi.object({
    password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).min(8).max(16).required().trim().messages({
        'any.required': 'Password must be required.',
        'string.empty': 'Password can not be empty.',
        'string.pattern.base': 'Password must contain one digit, one lowercase letter, one uppercase letter, one special character and it must be 8-16 characters long.',
    }),
    email: Joi.string().email().required().lowercase().trim().messages({
        'any.required': 'Email must be required.',
        'string.empty': 'This field can not be empty.',
        'string.email': 'Invalid email format.',
    })
})

// Export Schema
module.exports = { userRegistrationSchema, userLogginSchema };
