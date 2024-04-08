import Joi from "joi";

export const required = "{{#label}} is required";
export const only_string = "Only string is allowed";
export const password_pattern = "{{#label}} should contain at least 1 special, 1 uppercase , 1 lowercase and 1 numeric value";
export const valid_string = "Please select {{#label}}";
export const valid_url = "Please enter correct {{#label}} link";

export const validateEmail = (email: string | undefined): Joi.ValidationResult<string> => {
    const schema = Joi.string()
        .email({ tlds: { allow: false } })
        .allow("")
        .label("Email");

    return schema.validate(email);
};

export const validateName = (name: string | undefined): Joi.ValidationResult<string> => {
    const schema = Joi.string()
        .regex(/^[a-zA-Z\s]+$/)
        .trim()
        .required()
        .label("Name");

    return schema.validate(name);
};
