import { transporter } from "../Utils/emailUtils.js";

export default async (req,res,next) => {
    try{
            await transporter.verify();
            console.log(`Server is ready to take messages`);
            next()
        }
        catch(error){
            console.log(error);
            
        }
}