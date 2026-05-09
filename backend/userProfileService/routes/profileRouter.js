import express from 'express';
import { createProfile, deleteProfile, editProfile, getProfile, getProfileIDs, getProfiles } from '../controllers/profileController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { UserProfileValidation } from '../middlewares/validateMiddleware.js';
import upload from '../Utils/multerUtils.js';
const profileRouter = express.Router();
profileRouter.route("/registerProfile/:userId").post(authMiddleware, upload.single("profilePhoto"), UserProfileValidation, createProfile);
profileRouter.route("/edit-profile/:userId").post(authMiddleware, upload.single("profilePhoto"), UserProfileValidation, editProfile);
profileRouter.route("/getProfile/:userId").get(authMiddleware, getProfile);
profileRouter.route("/getProfiles").get(authMiddleware, getProfiles);
profileRouter.route("/getProfileIDs").get(authMiddleware, getProfileIDs);
profileRouter.route("/deleteProfile/:userId").delete(authMiddleware, deleteProfile);



export default profileRouter;