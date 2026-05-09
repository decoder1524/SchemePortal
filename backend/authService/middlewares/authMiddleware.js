import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")?.[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                });
            }
            else {
                req.user = decode;
                next();
            }
        })
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Please Provide Auth token"
        })
        
    }
}
