import randomBytes from "randombytes";
import Schemes from "../models/scheme.js";
import SchemeRule from "../models/schemeRules.js";

export const addScheme = async (req, res) => {
    // console.log(req.body);
    
    const { schemeName, minAge, maxAge,gender, maritalStatus, eligibleCategory, qualification, eligibleOccupation, income, description, startDate, endDate, government, documents,applyLink} = req.body;
    
    // console.log("Scheme Data : ", schemeName, minAge, maxAge, gender, maritalStatus, eligibleCategory, qualification, eligibleOccupation, income, description, startDate, endDate, government,documents);
    if (!schemeName || !minAge || !maxAge ||!gender ||!maritalStatus || !eligibleCategory || !qualification || !eligibleOccupation || !income || !description || !startDate || !endDate || !government || !documents || !applyLink) {
        return res.status(400).json({
            success: false,
            message: 'Input all fields'
        })
    }
    try {
        const schemeId = randomBytes(5).toString('hex');
        const scheme = await Schemes.findById(schemeId);
        if (scheme[0].length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Scheme Already Exists'
            })
        }
        const newScheme = new Schemes(schemeId, schemeName, minAge, maxAge, gender, maritalStatus, eligibleCategory, qualification, eligibleOccupation, income, description, startDate, endDate, government,documents,applyLink);
        await newScheme.save();
        return res.status(201).json({
            success: true,
            message: 'Scheme Added'
        });

    }
    catch (error) {
        console.log(error || "error in adding scheme");

    }


}
export const updateScheme = async (req, res) => {
    const { schemeId,schemeName, minAge, maxAge, gender, maritalStatus, eligibleCategory, qualification, eligibleOccupation, income, description, startDate, endDate, government , documents,applyLink} = req.body;
    // const documentsJSon = JSON.parse(req.body.documents);
    // console.log(documents);
    console.log("Scheme Data : ", schemeId, schemeName, minAge, maxAge, gender, maritalStatus, eligibleCategory, qualification, eligibleOccupation, income, description, startDate, endDate, government,documents,applyLink);
    if (!schemeName || !minAge || !maxAge ||!gender ||!maritalStatus|| !eligibleCategory || !qualification || !eligibleOccupation || !income || !description || !startDate || !endDate || !government || !documents || !applyLink) {
        return res.status(400).json({
            success: false,
            message: 'Input all fields'
        })
    }
    try {
        // const schemeId = req.params.id;
        console.log("scheme id : ",schemeId);
        const scheme = await Schemes.findById(schemeId);
        const newScheme = new Schemes(schemeId, schemeName, minAge, maxAge, gender, maritalStatus, eligibleCategory, qualification, eligibleOccupation, income, description, startDate, endDate, government,documents,applyLink);

        await newScheme.updateById();
        return res.status(201).json({
            success: true,
            message: 'Scheme Updated',
            scheme
        });

    }
    catch (error) {
        console.log(error || "error in adding scheme");

    }


}
export const getScheme = async (req, res) => {
    const schemeId = req.params.schemeId;
    try {
        const schemeData = await Schemes.findById(schemeId);
        const scheme = schemeData[0][0]
        // console.log(scheme);
        
        if (scheme) {
            return res.status(201).json({
                success: true,
                message: 'Scheme Found',
                scheme
            });  
        }
        return res.status(404).json({
            success: false,
            message: 'Scheme Not Found'
        })
    }
    catch (error) {
        console.log(error || "error in adding scheme");

    }
}
export const getSchemes = async (req, res) => {
    try {
        const schemeData = await Schemes.find();
        const scheme = schemeData[0]
        if (scheme) {
            console.log(scheme);   
            return res.status(201).json({
                success: true,
                message: 'Scheme Found',
                scheme
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Scheme Not Found'
        })
    }
    catch (error) {
        console.log(error || "error in adding scheme");

    }
}

export const deleteScheme = async (req, res) => {
    const schemeId = req.params.schemeId;
    console.log(schemeId);
    
    try {
        const schemeData = await Schemes.findById(schemeId);
        const scheme = schemeData[0][0]
        console.log(scheme);
        
        if (scheme) {
            await Schemes.deleteById(schemeId)
            return res.status(201).json({
                success: true,
                message: 'Scheme Deleted',
            });  
        }
        return res.status(404).json({
            success: false,
            message: 'Scheme Not Found'
        })
    }
    catch (error) {
        console.log(error || "error in adding scheme");

    }
}

export const getSchemesRules = async (req, res) => {
    try {
        const schemeData = await SchemeRule.find();
        const scheme = schemeData[0]
        if (scheme) {
            console.log(scheme);   
            return res.status(201).json({
                success: true,
                message: 'Schemes Found',
                scheme
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Scheme Not Found'
        })
    }
    catch (error) {
        console.log(error || "error in Getting scheme");

    }
}