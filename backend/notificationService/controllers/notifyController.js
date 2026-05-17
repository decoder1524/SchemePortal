import Notification from "../models/notification.js";
import { transporter } from "../Utils/emailUtils.js";

export const sendRegistrationMail = async (req, res) => {
    console.log(req.body);
    const { to, name } = req.body

    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: to,
            subject: "Registration Successfull",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #4CAF50;">Welcome, ${name} 👋</h2>
                    
                    <p>Your registration has been <b>successfully completed</b>.</p>
                    
                    <p>
                        Stay active! Must complete your profile,  If any scheme matches your profile,
                        we’ll notify you via email or in-app notification.
                    </p>
                    
                    <hr />
                    
                    <p><b>Your Email:</b> ${to}</p>
                    
                    <br />
                    <p style="color: gray; font-size: 12px;">
                        This is an auto-generated email. Please do not reply.
                    </p>
                </div>
            `
        });
        console.log(info);
        return res.status(200).json({
            success: true,
            message: "sent",
            info
        })
    } catch (error) {
        console.log(error);
    }
}
export const sendNewschemeMail = async (req, res) => {
    const data = req.body;
    const sendData = []
    data.map(e => {
        sendData.push({ userId: e.userId, email: e.email, name: e.role, scheme: e.eligible_scheme.map(scheme => scheme.schemeName) })

    });

    try {
        const info = async (data) => {
            return await transporter.sendMail({
                from: process.env.SENDER_EMAIL,
                to: data.email,
                subject: "New Scheme",
                html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #4CAF50;">Hello, ${data.name} 👋</h2>
                    
                    <p>New scheme has been <b>Uploaded</b>.</p>
                    
                    <p>
                        Stay active! Must complete your profile, 
                        we’ll notify you via email.
                    </p>
                    
                    <hr />
                    
                    <p><b>Your Email:</b> ${data.email}</p>
                    <p><b>Scheme Details : </b> ${data?.scheme}</p>

                    
                    <br />
                    <p style="color: gray; font-size: 12px;">
                        This is an auto-generated email. Please do not reply.
                    </p>
                </div>
            `
            });


        }
        const response = await Promise.all(
            sendData.map(data => info(data))
        )


        const store = [];
        await Promise.all(
            response.map((data, index) => {
                const notificationData = {
                    userId: sendData[index]?.userId,
                    email: data?.accepted,
                    notified: data?.accepted?.length > 0 ? true : false
                }

                const res = new Notification(notificationData);
                res.save();
                store.push(res);
                console.log(res);

            })
        )
        // console.log (store);
        return res.status(200).json({
            success: true,
            message: "sent",
            store
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "failed to send Message"   ,

        })
    }
}
export const sendNewschemeMailSingle = async (req, res) => {
    const e  = req.body;
    const sendData = []
    sendData.push({ userId: e.userId, email: e.email, name: e.role, scheme: e.eligible_scheme.map(scheme => scheme.schemeName) })


    try {
        const info = async (data) => {
            return await transporter.sendMail({
                from: process.env.SENDER_EMAIL,
                to: data.email,
                subject: "New Scheme",
                html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #4CAF50;">Hello, ${data.name} 👋</h2>
                    
                    <p>New scheme has been <b>Uploaded</b>.</p>
                    
                    <p>
                        Stay active! Must complete your profile, 
                        we’ll notify you via email.
                    </p>
                    
                    <hr />
                    
                    <p><b>Your Email:</b> ${data.email}</p>
                    <p><b>Scheme Details : </b> ${data?.scheme}</p>

                    
                    <br />
                    <p style="color: gray; font-size: 12px;">
                        This is an auto-generated email. Please do not reply.
                    </p>
                </div>
            `
            });


        }
        const response = await Promise.all(
            sendData.map(data => info(data))
        )


        const store = [];
        await Promise.all(
            response.map((data, index) => {
                const notificationData = {
                    userId: sendData[index]?.userId,
                    email: data?.accepted,
                    notified: data?.accepted?.length > 0 ? true : false
                }

                const res = new Notification(notificationData);
                res.save();
                store.push(res);
                console.log(res);

            })
        )
        // console.log (store);
        return res.status(200).json({
            success: true,
            message: "sent",
            store
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "failed to send Message",

        })
    }
}


export const getData = async (req, res) => {
    try {
        const getNotifications = await Notification.find();
        if (getNotifications[0].length > 0) {
            return res.status(200).json({
                success: true,
                notification: getNotifications[0]
            })
        }
        res.status(204).json({
            success: false,
            message: "not found"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}