import dotenv from 'dotenv';
import UserProfile from '../models/userProfile.js';
dotenv.config();

export const createProfile = async (req, res) => {
    try {
        const user = req.user;
        console.log('Authenticated user:', user);

        const { firstName, lastName, age, phone, gender,marital_status, dob, category, minority, income, street, city, district, state, pincode, landmark, qualification, occupation_status } = req.body;
        const userId = req.params.userId;
        const profilePhoto = req?.file?.filename;
        console.log('Profile data:', { userId, profilePhoto, firstName, lastName, age, phone, gender, marital_status, dob, category, minority, income, street, city, district, state, pincode, landmark, qualification, occupation_status });
        // Validate required fields
        if (!profilePhoto || !firstName || !lastName || !age || !phone || !gender || !marital_status || !dob || !category || !minority || !income || !street || !city || !district || !state || !pincode || !qualification || !occupation_status) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if profile already exists
        const existingProfile = await UserProfile.findByUserId(userId);
        if (existingProfile[0].length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Profile already exists for this user'
            });
        }

        // Create new profile
        const profile = new UserProfile({
            userId,
            profilePhoto,
            firstName,
            lastName,
            age,
            phone,
            gender,
            marital_status,
            dob,
            category,
            minority,
            income,
            street,
            city,
            district,
            state,
            pincode,
            landmark,
            qualification,
            occupation_status
        });

        await profile.save();

        return res.status(201).json({
            success: true,
            message: 'Profile created successfully',
            user: {
                userId,
                email: user.email,
                role: user.role
            },
            isLoggedIn: true
        });

    }
    catch (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
export const getProfile = async (req, res) => {
    try {
        const user = req.user;
        console.log('Authenticated user:', user);
        const userId = req.params.userId;
        const userProfile = await UserProfile.findByUserId(userId);
        // console.log("Pofile Found:",userProfile);
        if (userProfile[0].length > 0) {
            return res.status(201).json({
                success: true,
                message: 'Profile Found',
                userProfile : userProfile[0][0]
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Profile Not Found',
        });


    }
    catch (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
export const getProfiles = async (req, res) => {
    try {
        const user = req.user;
        console.log('Authenticated user:', user);
        const userProfile = await UserProfile.find();
        if (userProfile[0].length > 0) {
            return res.status(201).json({
                success: true,
                message: 'Profile Found',
                userProfile : userProfile[0]
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Profile Not Found',
        });


    }
    catch (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
export const getProfileIDs = async (req, res) => {
    try {
        const user = req.user;
        console.log('Authenticated user:', user);
        const userProfileIds = await UserProfile.findUserIds();
        if (userProfileIds[0].length > 0) {
            return res.status(201).json({
                success: true,
                message: 'Profile Found',
                userProfileIds : userProfileIds[0]
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Profile Not Found',
        });


    }
    catch (error) {
        console.error('Error finding profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const editProfile = async (req, res) => {
    try {
        const user = req.user;
        console.log('Authenticated user Edit :', user);

        const { firstName, lastName, age, gender, marital_status,  dob, phone, category, minority, income, street, city, district, state, pincode, landmark, qualification, occupation_status } = req.body;
        const userId = req.params.userId;
        const existingProfile = await UserProfile.findByUserId(userId);
        const profilePhoto = req.file
            ? req.file.filename
            : existingProfile[0][0]?.profilePhoto || null;
        console.log("profile Photo : ",profilePhoto)
        console.log('Profile data:', { userId, profilePhoto, firstName, lastName, age, gender, marital_status, dob, phone, category, minority, income, street, city, district, state, pincode, landmark, qualification, occupation_status });


        // Validate required fields
        if (!firstName || !lastName || !age || !gender || !marital_status || !dob || !phone || !category || !minority || !income || !street || !city || !district || !state || !pincode || !qualification || !occupation_status) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        // Check if profile already exists
        const profile = new UserProfile({
            userId,
            profilePhoto,
            firstName,
            lastName,
            age,
            gender,
            marital_status,
            dob,
            phone,
            category,
            minority,
            income,
            street,
            city,
            district,
            state,
            pincode,
            landmark,
            qualification,
            occupation_status
        });

        await profile.updateByUserId(userId);

        return res.status(201).json({
            success: true,
            message: 'Profile Update successfully',
            userId
        });

    }
    catch (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


export const deleteProfile = async (req, res) => {
    const userId = req.params.userId;
    const user = await UserProfile.findByUserId(userId);
    console.log(user);
    if (!user[0][0]) {
        return res.status(404).json({
            success: false,
            message: ' Users not found',

        })
    }
    await UserProfile.deleteByUserId(userId);
    console.log("User Deleted",user);
    return res.status(201).json({
        success: true,
        message: 'Users Deleted!',
        users: user[0]

    })


}