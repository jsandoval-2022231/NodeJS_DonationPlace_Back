import joi from 'joi';

export const userSchema = joi.object({
    name: joi.string().required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required'
    }),
    email: joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required'
    }),
    password: joi.string().required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required'
    }),
    address: joi.string().required().messages({
        'string.base': 'Address must be a string',
        'string.empty': 'Address cannot be empty',
        'any.required': 'Address is required'
    }),
    phone: joi.string().required().messages({
        'string.base': 'Phone must be a string',
        'string.empty': 'Phone cannot be empty',
        'any.required': 'Phone is required'
    }),
    role: joi.string().valid('ADMIN', 'USER').default('USER').messages({
        'string.base': 'Role must be a string',
        'string.empty': 'Role cannot be empty',
        'any.only': 'Role must be either ADMIN or USER'
    }),
    joinDate: joi.date().default(Date.now).messages({
        'date.base': 'Join date must be a date',
        'date.empty': 'Join date cannot be empty'
    }),
    ratings: joi.number().default(0).messages({
        'number.base': 'Ratings must be a number',
        'number.empty': 'Ratings cannot be empty'
    })
});