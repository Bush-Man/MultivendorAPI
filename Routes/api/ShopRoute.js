import express from "express";
import { verifyAdmin, verifyShopsAdmin, verifyShopUpdateOrDeleteAuthorization} from "../../Utils/JWTVerification.js";
import { validateLoginInput, validateShopInput } from "../../Utils/ValidateInput.js";
import { createNewShop, deleteShop, getAllShop, getShop, loginToShop, updateShop } from "../../Controller/Shop/ShopController.js";

const router = express.Router();
router.get("/",verifyShopsAdmin,getAllShop);
router.post("/create",validateShopInput,createNewShop);
router.post("/login",validateLoginInput,loginToShop);
router.get("/:id",getShop);
router.put("/:id", verifyShopUpdateOrDeleteAuthorization,validateShopInput, updateShop);
router.delete("/:id", verifyShopUpdateOrDeleteAuthorization, deleteShop);


export default router;