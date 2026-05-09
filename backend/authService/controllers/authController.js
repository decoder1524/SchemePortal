import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import User from '../models/user.js'
import randomBytes from 'randombytes';
import dotenv from 'dotenv';
dotenv.config();
export const register = async (req, res) => {
    const { email, password } = req.body;
    const role = 'citizen';
    try {
        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: "Input All Fields" });
        }
        const userId = randomBytes(5).toString('hex');
        const userData = await User.findByEmail(email);
        const user = userData[0][0];
        if (userData[0].length > 0) {
            return res.status(409).json({
                succes: false,
                message: "Already Registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ userId, email, password: hashedPassword, role });
        await newUser.save();
        const accessToken = jwt.sign({ userId, role }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId, role }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        return res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' }).status(201).json({
            success: true,
            message: 'User Created',
            token: accessToken,
            isLoggedIn: true,
            user: {
                userId,
                email,
                role
            }
        });
}
    catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message
    });
}

}


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(500).json({ success: false, message: "Input All Fields" });
        }
        const userData = await User.findByEmail(email);
        const user = userData[0][0];
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }
        const accessToken = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        return res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' }).status(200).json({
            success: true,
            message: 'Login Successfully',
            token: accessToken,
            isLoggedIn: true,
            user: {
                userId: user.userId,
                email: user.email,
                role: user.role
            }
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};
export const changePassword = async (req, res) => {
    const { email, oldPassword,password } = req.body;
    console.log(email,oldPassword,password);
    
    try {
        if (!email || !password || !oldPassword) {
            return res.status(400).json({ success: false, message: "Input All Fields" });
        }
        const userData = await User.findByEmail(email);
        const user = userData?.[0]?.[0];
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const userPasssword = await new User({email,password:hashedPassword})
        userPasssword.updatePasswordByEmail();
        return res.status(200).json({
            success: true,
            message: 'Password change successfully',
            user: {
                userId: user.userId,
                email: user.email,
                role: user.role
            }   
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Password Change failed',
            error: error.message
        });
    }
};

export const logout = (req, res, next) => {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'strict' })
    return res.json({
        sucess: true,
        message: "Logged Out Succesfully",
        isLoggedIn: false,
    })
}

export const refresh = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            succes: false,
            message: "Unauthorized"
        })
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)
    const accessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' })
    return res.status(201).json({
        succes: true,
        message: 'Token Refresh Successfully',
        token: accessToken,
        isLoggedIn: true,
        user: {
            userId: decoded.userId,
            role: decoded.role
        }
    })

}