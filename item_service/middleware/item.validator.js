import Joi from "joi";

export const itemSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required",
        "string.empty": "Title is not allowed to be empty"
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description is not allowed to be empty"
    }),
    category: Joi.string().required().messages({
        "any.required": "Category is required",
        "string.empty": "Category is not allowed to be empty"
    }),
    condition: Joi.string().valid('NEW', 'USED', 'REFURBISHED', 'DAMAGED', 'FOR PARTS').default('USED').messages({
        "any.only": "Condition must be NEW, USED, REFURBISHED, DAMAGED, FOR PARTS"
    }),
    img: Joi.string().required().messages({
        "any.required": "Image is required",
        "string.empty": "Image is not allowed to be empty"
    }),
    postedDate: Joi.date().default(Date.now).messages({
        "date.base": "Posted date must be a date"
    }),
    status: Joi.boolean().default(true).messages({
        "boolean.base": "Status must be a boolean"
    })
});