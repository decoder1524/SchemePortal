import axios from "axios";
import Eligible from "../models/eligible.js";

export const eligbilityController = async (req, res) => {
    const profileIds = req.body;
    // console.log("Line 6",profileIds);

    try {
        const token = req.headers.authorization?.split(" ")?.[1];
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const allResult = []
        const userProfile = await axios.get(`http://localhost:3001/getProfiles`);
        const schemes = await axios.get(`http://localhost:3002/get-schemesRule`);
        const profile = userProfile.data.userProfile;
        for (let index = 0; index < profile.length; index++) {
            const element = profile[index].userId;
            const rules = schemes.data.scheme;
            // console.log(profile);
            // console.log(rules);
            const result = checkAllScheme(profile[index], rules);
            result.userId = element;
            // console.log(element);
            allResult.push(result)

        }
        return res.json({
            success: true,
            allResult,
            profileIds
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


const checkAllScheme = (user, schemes) => {
    const eligibleScheme = [];
    const notEligibleScheme = [];
    schemes.map(scheme => {
        const result = checkEligibility(user, scheme.rules);
        if (result.eligible) {
            eligibleScheme.push({
                schemeid: scheme.schemeid,
                schemeName: scheme.rules.scheme_name,
                eligible: result.eligible
            })
        }
        else {
            notEligibleScheme.push({
                schemeId: scheme.schemeid,
                schemeName: scheme.rules.scheme_name,
                reasons: result.reasons,
                eligible: result.eligible
            })
        }
    });

    return {
        eligibleScheme,
        notEligibleScheme
    }
}

const checkEligibility = (user, rule) => {
    const reasons = [];
    if (!((user.age >= rule.min_age) && (user.age <= rule.max_age))) {
        reasons.push("Age not in range")
    }

    const allowedCategories = rule.eligible_category;
    if (!allowedCategories.includes(user.category)) {
        reasons.push("Category not eligible")
    }
    if (user.income !== rule.income) {
        reasons.push("Income mismatch")
    }
    if (!rule.gender.includes(user.gender)) {
        reasons.push("Gender Not Eligible")
    }
    if (!rule.marital_status.includes(user.marital_status)) {
        reasons.push("Marital status mismatch")
    }

    const levels = {
        "Illiterate":0,
        "Primary": 1,
        "Secondary": 2,
        "Higher Secondary": 3,
        "Undergraduate": 4,
        "Postgraduate": 5,
        "PHD": 6
    };
    if (levels[user.qualification] < levels[rule.eligible_qualification]) {
        reasons.push("Qualification not sufficient")
    }

    if (user.occupation_status !== rule.eligible_occupation) {
        reasons.push("Occupation not match")
    }

    return {
        eligible: reasons.length === 0,
        reasons
    }

}

export const postEligibleData = async (req, res) => {
    const allResult = req.body;
    // console.log(allResult);
    if (!allResult) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const values = []
    allResult.map(data => {
        const userId = data?.userId;
        const eligible = JSON.stringify(data?.eligibleScheme || []);
        const notEligible = JSON.stringify(data?.notEligibleScheme || []);
        values.push([userId, eligible, notEligible]);
    }

    )
    console.log(values);
    await Eligible.save(values);
    // // console.log("process Complete`");
    res.status(200).json({
        success:true,
        message:"Eligibility Saved"
    });
}

export const getEligible = async (req, res) => {
    const userId = req.params.userId;
    const eligible = await Eligible.findEligible(userId);
    const schemeids = []
    if (eligible[0].length > 0) {
        const eligibleScheme = eligible[0][0].eligible_scheme
        eligibleScheme.map(element => {
            schemeids.push(element.schemeid)
            // console.log(element.schemeid);
        })
        console.log(schemeids);
        return res.status(200).json({
            success: true,
            message: 'scheme found',
            schemeids
        })
    }
    return res.status(204).json({
            success: false,
            message: 'scheme not found',
            schemeids
        })
}
export const getEligibleUsers = async (req, res) => {
    try {
        const eligible = await Eligible.find();
        const eligibleUsers = eligible[0]
        // console.log(eligibleUsers);
        const userIds = [];
        eligibleUsers.forEach((user)=>{
            // console.log(user.eligible_scheme);
            if(user.eligible_scheme.length !== 0){
                userIds.push({user:user.userid,eligible_scheme:user.eligible_scheme})
                // console.log(user.userid);
            }
        });
        // console.log("userIds ",userIds);
        const token = req.headers.authorization?.split(" ")?.[1];
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const userData= await axios.get(`http://localhost:3000/getUsers`);
        // console.log(userData.data.users);
        const Profiles = userData?.data?.users?.map((userDatas,index)=>{

            const match = userIds.find(e => e.user === userDatas.userId)
            return {
                ...userDatas,
                eligible_scheme : match ? match.eligible_scheme : []
            }
        })
        // console.log(Profiles);
        const eligibleProfiles = Profiles.filter((eligible)=> eligible.eligible_scheme.length > 0)
        console.log(eligibleProfiles);
        
        
        res.json({
            success:true,
            eligibleProfiles
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
}