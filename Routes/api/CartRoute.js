/*import express from "express";
import { verifyAdmin, verifyTokenAndAuthorization } from "../../Utils/JWTVerification.js";
import { validateShopInput } from "../../Utils/ValidateInput.js";
import { createNewShop, deleteShop, getAllShop, getShop, loginToShop, updateShop } from "../../Controller/Shop/ShopController.js";

const router = express.Router();
router.get("/:id", verifyTokenAndAuthorization,validateShopInput, getShop);
router.get("/", verifyAdmin, getAllShop);
router.post("/create", createNewShop);
router.post("/login", loginToShop);
router.put("/:id", verifyTokenAndAuthorization,validateShopInput, updateShop);
router.delete("/:id", verifyTokenAndAuthorization,validateShopInput, deleteShop);


export default router;
*/