import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getFeedback, postFeedBack } from '../controllers/feedbackController.js';
const feedbackRouter = express.Router();

router.route('/feedback').post(authMiddleware,postFeedBack);
router.route('/getFeedback').get(authMiddleware,getFeedback);

export default feedbackRouter;
