import joi from 'joi';

export const UserProfileValidation = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().min(3).required().messages({
            "string.empty": "FirstName is required", 

        }),
        lastName: joi.string().min(3).required().messages({
            "string.empty": "LastName is required",

        }),
        dob: joi.date()
            .iso()
            .max("now")
            .required()
            .messages({
                "date.base": "Invalid Date",
                "date.format": "Invalid Date",
                "date.max": "Future Date not allowed"
            }),
        age: joi.number().min(18).max(99).required().messages({
            "number.empty": "Age is required",

        }),
        gender: joi.string().valid("Male", "Female").required().messages({
            "string.empty": " Gender is required",

        }),
        marital_status: joi.string().valid("Married", "Unmarried").required().messages({
            "string.empty": " Marital status is required",

        }),
        phone: joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                "string.empty": "Phone number required",
                "string.pattern.base": "Phone must be 10 digits"
            }),

        category: joi.string().valid("General", "OBC", "SC", "ST").required().messages({
            "string.empty": "Category is required",

        }),
        minority: joi.string().valid("yes", "no").required().messages({
            "string.empty": " IsMinority  required",
        }),
        income: joi.string().valid("0-3L", "3L-5L", "5L-10L", "10L-20L",).required().messages({
            "string.empty": "Income is required"
        }),
        street: joi.string().required().messages({
            "string.empty": "Fill Street Field",

        }),
        city: joi.string().required().messages({
            "string.empty": "Fill city field",

        }),
        district: joi.string().required().messages({
            "string.empty": "Fill district field",

        }),
        state: joi.string().required().messages({
            "string.empty": "State filed is empty",

        }),
        pincode: joi.number().required().messages({
            "string.empty": "Pincode is empty",

        }),
        landmark: joi.string().required().messages({
            "string.empty": "Landmark is empty",

        }),
        qualification: joi.string().valid("Illiterate","Primary Education", "Middle Education", "High School Education", "Higher Secondary Education", "Undergraduate", "Postgraduate", "PHD").required().messages({
            "string.empty": "Qualification is required",

        }),
        occupation_status: joi.string().valid("Student", "Unemployed", "Private Employee", "Government Employee", "Business").required().messages({
            "string.empty": "Occupation field is required",

        })
    }).unknown(true)
    const { error } = schema.validate(req.body,{ abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
    next();


}