import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getFeedback, postFeedBack } from '../controllers/feedbackController.js';
const feedbackRouter = express.Router();

feedbackRouter.route('/feedback').post(authMiddleware,postFeedBack);
feedbackRouter.route('/getFeedback').get(authMiddleware,getFeedback);

export default feedbackRouter;
