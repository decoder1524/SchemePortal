import joi from 'joi';

export const registerValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            "string.email": "Please provide a valid email address"
        }),
        password: joi.string()
            .min(6)
            .max(128)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/)
            .required()
            .messages({
                "string.empty": "Password is required",
                "string.min": "Password must be at least 6 characters long",
                "string.max": "Password must not exceed 128 characters",
                "string.pattern.base":
                    "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character (@$!%*?&)"
            }),
        confirmPassword: joi.any().valid(joi.ref('password')).messages({
            "any.only": "Password and confirm password must be same"
        }).required()
    })
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error?.details?.map(err => err.message)
        });
    }
    next();

}
export const changePasswordValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            "string.email": "Please provide a valid email address"
        }),
        oldPassword: joi.string()
            .min(6)
            .max(128)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/, "password requirements")
            .required()
            .messages({
                "string.min": "Password must be at least 6 characters long",
                "string.max": "Password must not exceed 128 characters",
                "string.pattern.base": "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character (@$!%*?&)"
            }),
        password: joi.string()
            .min(6)
            .max(128)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/, "password requirements")
            .required()
            .messages({
                "string.min": "Password must be at least 6 characters long",
                "string.max": "Password must not exceed 128 characters",
                "string.pattern.base": "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character (@$!%*?&)"
            }),
        confirmPassword: joi.any().valid(joi.ref('password')).messages({
            "any.only": "Password and confirm password must be same"
        }).required()
    })
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error?.details?.map(err => err.message)
        });
    }
    next();

}
export const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            "string.email": "Please provide a valid email address"
        }),
        password: joi.string()
            .min(6)
            .max(128)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/, "password requirements")
            .required()
            .messages({
                "string.min": "Password must be at least 6 characters long",
                "string.max": "Password must not exceed 128 characters",
                "string.pattern.base": "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character (@$!%*?&)"
            })
    })
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error && error.details.length > 0) {
        return res.status(400).json({
            success: false,
            error: error?.details?.map(err => err.message)
        });
    }
    next();

}