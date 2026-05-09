import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'manishkumardewangan56@gmail.com',
        pass:'kgdk xkye mbqi piwo'
    },
});
