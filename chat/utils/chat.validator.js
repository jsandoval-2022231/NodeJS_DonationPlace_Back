import Joi from "joi";

export const chatValidator = {
    createChat: Joi.object().keys({
        users: Joi.array().items(Joi.string().required()).required(),
    }),
    createMessage: Joi.object().keys({
        senderId: Joi.string().required(),
        message: Joi.string().required(),
    }),
};