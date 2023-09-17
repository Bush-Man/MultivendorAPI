import mongoose from "mongoose";
import express from "express";
import { validateLoginInput, validateUserInput } from "../../Utils/ValidateInput.js";
import { loginUserController, logout, signUpUserController } from "../../Controller/auth/signUpUser.js";
import { verifyTokenAndLogout } from "../../Utils/JWTVerification.js";
const router = express.Router();

router.post("/register-user", validateUserInput, signUpUserController);
router.post("/login-user", validateLoginInput, loginUserController);
router.post("/logout",verifyTokenAndLogout, logout);


export default router;
