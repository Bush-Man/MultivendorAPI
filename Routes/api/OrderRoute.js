import express from "express";
import { verifyAdmin, verifyToken, verifyTokenAndAuthorization} from "../../Utils/JWTVerification.js";
import { createOrder, getAllOrders, getOrder, getOrders } from "../../Controller/Order/OrderController.js";


const router = express.Router();
router.post("/payment",verifyToken,createOrder);
router.get("/:id",verifyTokenAndAuthorization,getOrder);
router.get("/",verifyAdmin,getAllOrders);
router.get("/:id",verifyTokenAndAuthorization,getOrders);



export default router;