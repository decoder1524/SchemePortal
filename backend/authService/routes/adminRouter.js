import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createUserValidation } from '../middlewares/adminValidationMiddleware.js';

const adminRouter = express.Router();

adminRouter.route('/createUser').post(createUserValidation, authMiddleware, createUser);
adminRouter.route('/getUsers').get(authMiddleware, getUsers);
adminRouter.route('/getUser/:userId').get(authMiddleware, getUser);
adminRouter.route('/updateUser/:userId').put( authMiddleware, updateUser);
adminRouter.route('/deleteUser/:userId').delete(authMiddleware, deleteUser);
export default adminRouter;