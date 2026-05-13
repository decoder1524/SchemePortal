import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getFeedback, getFeedbacks, postFeedBack, updateFeedback } from '../controllers/feedbackController.js';
const feedbackRouter = express.Router();

feedbackRouter.route('/feedback').post(authMiddleware,postFeedBack);
feedbackRouter.route('/getFeedback').get(authMiddleware,getFeedback);
feedbackRouter.route('/getFeedbacks/:userId').get(authMiddleware,getFeedbacks);
feedbackRouter.route('/updateFeedback').put(authMiddleware,updateFeedback);

export default feedbackRouter;
