import joi from 'joi';

const schemeDataValidation = (req, res, next) => {
    const schema = joi.object({
        schemeName: joi.string().min(3).required(),
        minAge: joi.number().min(3).required(),
        maxAge: joi.number().max(99).required(),
        maritalStatus: joi.string().valid("married", "unmarried").required(),
        eligibleCategory: joi.string().required(),
        qualification: joi.string().valid().required(),
        eligibleOccupation: joi.string().valid().required(),
        income: joi.string().valid().required(),
        description: joi.string().min(50).required(),
        startDate: joi.string().required(),
        endDate: joi.string().required(),
        government: joi.string().required(),
        documents: joi.string().required()
    }, {
        unknown: true
    })

    const { error } = schema.validate(req.body, { sbortEarly: false });
    console.log(error);
    
    if (error && error.details.length > 0) {
        return res.status(400).json({
            success: false,
            error: error?.details?.map(err => err.message)
        });
    }
    next();
}