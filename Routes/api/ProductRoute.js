import express from "express";
import { verifyAdmin, verifyAuthorizationAndShopToken, verifyShopToken,} from "../../Utils/JWTVerification.js";
import { createProduct, deleteProduct, getAllProducts, getAllShopProducts,getProduct, updateProduct } from "../../Controller/Product/ProductController.js";
//import { validateProductInput } from "../../Utils/ValidateInput.js";

//validateProductInput,
const router = express.Router();
router.get("/:id",getProduct);
router.get("/",getAllProducts);
router.get("/all/:shopId",getAllShopProducts);
router.post("/:id/create",verifyShopToken,createProduct);
router.put("/:id/update",verifyShopToken,updateProduct);
router.delete("/:id",verifyShopToken,deleteProduct);


export default router;