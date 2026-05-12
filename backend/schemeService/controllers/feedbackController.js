import Feedback from "../models/Feedback.js";

export const postFeedBack = async (req,res) =>{
    const {userId, title, description} = req.body;
    console.log(userId, title,description);
    if (!userId || !title || !description){
        return res.status(400).json({
            success:false,
            message:'Input All Fields'
        });
    }
    try {
        const feedback = new Feedback(userId,title,description);
        await feedback.save();
    } catch (error) {
        console.log(error);
        
    }
    res.status(200).json({
        success:true,
        message: 'We will notify you'
    })
}

export const getFeedback = async (req,res)=>{
    try {
        const feedback = await Feedback.find();
        const data = feedback[0];
        console.log(data);
        if (data.length > 0) {
            return res.status(200).json({
                success:true,
                message: 'Data Found',
                data
            }) 
        }
    } catch (error) {
        console.log(error);
        
    }
    res.status(204).json({
        success:false,
        message:'No Data Found'
    })

}