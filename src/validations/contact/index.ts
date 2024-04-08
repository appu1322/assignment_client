import Joi from "joi";
import { required } from "../shared";

export const contactValidation = Joi.object({
    firstName: Joi.string()
        .label("Name")
        .required()
        .messages({
            "string.empty": required,
        }),
    gender: Joi.string()
        .required()
        .label("Gender")
        .messages({
            "string.empty": required,
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .lowercase()
        .label("Email")
        .required()
        .messages({
            "string.empty": required,
        }),
    phone: Joi.string()
        .required()
        .min(8)
        .label("Phone Number")
        .messages({
            "string.empty": required
        })
});