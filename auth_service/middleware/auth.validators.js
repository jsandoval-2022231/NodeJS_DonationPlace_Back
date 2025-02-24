import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required"
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters",
        "string.empty": "Password is required"
    })
});