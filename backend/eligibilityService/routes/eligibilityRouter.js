import express from 'express';
import { eligbilityController, getEligible, getEligibleUsers, postEligibleData } from '../controllers/eligibilityController.js';
import authMiddleware from '../middlewares/authMiddleware.js'
const eligibilityRouter = express.Router();

eligibilityRouter.route("/checkEligibile").post(authMiddleware ,eligbilityController);
eligibilityRouter.route("/getEligibleScheme/:userId").get(authMiddleware ,getEligible);
eligibilityRouter.route("/postEligibleData").post(authMiddleware,postEligibleData);
eligibilityRouter.route("/getEligibleUsers").get(authMiddleware,getEligibleUsers);

export default eligibilityRouter;