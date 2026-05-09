import bcrypt from "bcryptjs";
import User from "../models/user.js";
import randomBytes from "randombytes";
export const createUser = async (req, res) => {
    const { email, password, role } = req.body;
    console.log(email, password, role);
    if (!email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Input all fields"
        })
    }
    try {

        const userId = randomBytes(5).toString('hex');
        const userData = await User.findByEmail(email);
        if (userData[0].length > 0) {
            return res.status(409).json({
                succes: false,
                message: "Already Registered"
            });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({userId, email,password:hashPassword, role});
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User Created'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User Creation failed',
            error: error.message
        });

    }
}

export const getUsers = async (req, res) => {
    const users = await User.find();
    console.log(users);
    if (users[0].length < 0) {
        return res.status(404).json({
            success: false,
            mesage: ' Users not found',

        })
    }
    return res.status(201).json({
        success: true,
        mesage: 'Got Users!',
        users: users[0]

    })


}
export const getUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByUserId(userId);
    console.log(user);
    if (user[0].length < 0) {
        return res.status(404).json({
            success: false,
            mesage: ' User not found',

        })
    }
    return res.status(201).json({
        success: true,
        mesage: 'Got User!',
        user: user[0][0]

    })


}

export const updateUser = async (req, res) => {
    const { email, role } = req.body;
    const userId = req.params.userId;
    console.log(userId, email, role);
    if (!email || !role) {
        return res.status(400).json({
            success: false,
            message: "Input all fields"
        })
    }
    try {
        const userData = await User.findByUserId(userId);
        if (userData[0].length > 0) {
            const updatedUser = new User({email, role});
            await updatedUser.updateByUserId(userId);
            console.log(updateUser);
            return res.status(201).json({
                success: true,
                message: "User Updated",
                updatedUser
            })

        }
        return res.status(404).json({
            success: true,
            message: 'User Not found'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User Creation failed',
            error: error.message
        });

    }
}

export const deleteUser = async (req, res) => {
    try {
        
        const userId = req.params.userId;
        const user = await User.findByUserId(userId);
        console.log(user);
        if (!user || !user.length === 0 || user[0].length === 0 ) {
            return res.status(404).json({
                success: false,
                message: ' Users not found',
    
            })
        }
        const userData = user[0][0]
        await User.deleteByUserId(userId);
        console.log("User Deleted",userData);
        
        return res.status(204).json({
            success: true,
            message: 'Users Deleted!',
            user: userData
    
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal Server Error '
        })
        
    }

}