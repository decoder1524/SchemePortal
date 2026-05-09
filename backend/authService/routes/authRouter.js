import express from 'express';
import  {register,login, logout, refresh, changePassword} from "../controllers/authController.js"
import { changePasswordValidation, loginValidation, registerValidation } from '../middlewares/validateMiddleware.js';
const authRouter = express.Router();

authRouter.route("/register").post(registerValidation,register);
authRouter.route("/changePassword").post(changePasswordValidation,changePassword);
authRouter.route("/login").post(loginValidation,login);
authRouter.route("/refresh").get(refresh);
authRouter.route("/logout").post(logout);       


export default authRouter;