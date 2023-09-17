import express from "express";
import {verifyToken, verifyTokenAndAuthorization } from "../../Utils/JWTVerification.js";
//import { validateShopInput } from "../../Utils/ValidateInput.js";
import { createWishList, deleteWish, getWish, getWishList } from "../../Controller/Wishlist/Wishlist.js";


const router = express.Router();
router.get("/:id",verifyTokenAndAuthorization, getWish);
router.get("/",verifyTokenAndAuthorization , getWishList);
router.post("/create",verifyToken, createWishList);
//router.put("/:id",verifyTokenAndAuthorization , updateShop);
router.delete("/:id", verifyTokenAndAuthorization,deleteWish);


export default router;