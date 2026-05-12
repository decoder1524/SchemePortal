import express from 'express';
import { addScheme, deleteScheme, getScheme, getSchemes, getSchemesRules, updateScheme } from '../controllers/schemeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/add-scheme').post(authMiddleware,addScheme);
router.route('/edit-scheme').post(authMiddleware,updateScheme);
router.route('/delete-scheme/:schemeId').delete(authMiddleware,deleteScheme);
router.route('/get-scheme/:schemeId').get(authMiddleware,getScheme);
router.route('/get-schemes').get(authMiddleware,getSchemes);
router.route('/get-schemesRule').get(authMiddleware,getSchemesRules);
router.route('/feedback').post(authMiddleware,postFeedBack);
router.route('/getFeedback').get(authMiddleware,getFeedback);

export default router;
