import Feedback from "../models/Feedback.js";

export const postFeedBack = async (req, res) => {
    const { userId, title, description, status, rejectReason } = req.body;
    console.log(userId, title, description, status, rejectReason);
    if (!userId || !title || !description || !status || !rejectReason) {
        return res.status(400).json({
            success: false,
            message: 'Input All Fields'
        });
    }
    try {
        const feedback = new Feedback(userId, title, description, status, rejectReason);
        await feedback.save();
    } catch (error) {
        console.log(error);

    }
    res.status(200).json({
        success: true,
        message: 'We will notify you'
    })
}

export const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        const data = feedback[0];
        console.log(data);
        if (data.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'Data Found',
                data
            })
        }
    } catch (error) {
        console.log(error);

    }
    res.status(204).json({
        success: false,
        message: 'No Data Found'
    })

}

export const getFeedbacks = async (req, res) => {
    try {
        const userId = req.params.userId;
        const feedback = await Feedback.findById(userId);
        const data = feedback[0];
        console.log(data);
        if (data.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'Data Found',
                feedbacks: data
            })
        }
    } catch (error) {
        console.log(error);

    }
    res.status(204).json({
        success: false,
        message: 'No Data Found'
    })

}

export const updateFeedback = async (req, res) => {
    try {
        const { id, status, rejectReason } = req.body;
        console.log(id, status, rejectReason);

        const feedback = await Feedback.findByFeedId(id);
        const data = feedback[0][0];
        // console.log(data);
        const updateData = await new Feedback( data.userid, data.title, data.description, status, rejectReason );
        console.log({ userId: data.userid, title: data.title, description: data.description, status: status, rejectReason: rejectReason });
        await updateData.updateById(id);
        return res.status(200).json({
            success: true,
            message: 'Data Updated  ',
            feedbacks: data
        })
    } catch (error) {
        console.log(error);

    }
    res.status(204).json({
        success: false,
        message: 'No Data Found'
    })
}