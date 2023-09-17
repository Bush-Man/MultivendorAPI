import express from "express";
import { verifyToken, verifyTokenAndAuthorization } from "../../Utils/JWTVerification.js";
import { deleteUser, getUser } from "../../Controller/auth/UserController.js";
const router = express.Router();

router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/:id", verifyTokenAndAuthorization, getUser); 
export default router;
