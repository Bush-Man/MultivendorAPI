import express from "express";
import {  verifyAdmin, verifyToken } from "../../Utils/JWTVerification.js";
import { createReview, getAllProductsReviews, getAllReviews } from "../../Controller/Review/ReviewController.js";
const router =express.Router()

router.get("/",verifyAdmin, getAllReviews);
router.get("/:id", getAllProductsReviews); //id=>product id
router.post("/:id", verifyToken, createReview);//id =>Product Id 





export default router