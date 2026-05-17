import express from 'express';
import { getData, sendNewschemeMail, sendNewschemeMailSingle, sendRegistrationMail } from '../controllers/notifyController.js';
import smtpVerify from '../middlewares/smtpVerify.js';
const notifyRoutes = express.Router();

notifyRoutes.route('/sendRegistrationMail').post(smtpVerify,sendRegistrationMail);
notifyRoutes.route('/sendNewschemeMail').post(smtpVerify,sendNewschemeMail);
notifyRoutes.route('/sendNewschemeMailSingle').post(smtpVerify,sendNewschemeMailSingle);
notifyRoutes.route('/getNotifications').get(getData);

export default notifyRoutes;