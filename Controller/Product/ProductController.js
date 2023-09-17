import OrderModel from "../../Models/Order.js";
import ShopModel from "../../Models/Shop.js";
import UserModel from "../../Models/User.js";
import ProductModel from "../../Models/Product.js";
//import { validationResult } from "express-validator";
//import createError from "../../MiddleWare/CreateError.js";
import mongoose from "mongoose";
import { createError } from "../../MiddleWare/CreateError.js";

//ALL VERIFICATIONS ON AUTHORIZATION FOR THIS FILE ARE IN JWTVERIFICATION.JS AND PRODUCTROUTE.JS

//Create Product(Tested)
export const createProduct = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return next(createError(400, "Empty Products Inputs or"+ errors.array()));

    // }
  const { title, description, category, originalPrice, discountPrice, stock, imageUrl } = req.body;
  console.log(req.body);
  const id = req.shop.id; //already verified product Routes
  if (mongoose.Types.ObjectId.isValid(id)) {
    
    try {
      const shop = await ShopModel.findById(id);
      if (!shop) {
        return next(createError(404, "Shop Does Not Exist "));
      }
      const newProduct = await new ProductModel({ title, description, category, originalPrice, discountPrice, stock, shopId:shop._id,imageUrl});
      console.log(newProduct);
      await newProduct.save();
      res.sendSuccess(200, "Product Created Successfully");
        
    } catch (err) {
      next(createError(500, err.message));
        
    }
    
  } else {
    return  next(createError(404, "Invalid shopId"));
  }
}


//Delete Product(Tested)
export const deleteProduct = async (req, res, next) => {
 const shopId = req.shop.id;//from token
  const productId = req.params.id;
  const isIdsValid = (mongoose.Types.ObjectId.isValid(shopId) && mongoose.Types.ObjectId.isValid(productId));
  if (isIdsValid) {
    
    try {
      const shop = await ShopModel.findById(shopId);
      const product = await ProductModel.findById(productId);

      if (!shop || !product) {
        return next(createError(400, "Shop Or Product Not Found Please Enter Valid Shop And Product"));
      }
      if (product.shopId == shop._id) {
        await ProductModel.findByIdAndDelete(product._id);
        res.sendSuccess(200, "Product Deleted Successfully");
      } else {
         return next(createError(404, "You Can Only Delete Your Own Product"));
      }
   } catch (err) {
     next(createError(500,err.message));
   }
  } else {
    return next(createError(400, "Invalid ProductId"));
  }

}


//get a product(Tested)
export const getProduct = async (req, res, next) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const product = await ProductModel.findById(id);
      if (product) {
        
        res.status(200).json(product);
      } else {
        return  next(createError(404, "Product Not Found"));
      }
    } catch (err) {
      next(createError(500, err.message));
    }
  } else {
    return  next(createError(404, "Invalid ProductId"));
  }
}

//Get All Products(Tested)
export const getAllProducts = async (req,res,next)=>{
  try {
    const products = await ProductModel.find();
    if (products) {
    res.status(200).json(products);
      
    } else {
      return  next(createError(404, "No Products Found In Database"));
    }
  } catch (err) {
    next(createError(500,err.message));
  }
}
//update Product( verify seller and token)(Tested)
export const updateProduct = async (req, res, next) => {
  const shopId = req.shop.id;//from token
  const productId = req.params.id;
  const isIdsValid = (mongoose.Types.ObjectId.isValid(shopId) && mongoose.Types.ObjectId.isValid(productId));
  if (isIdsValid) {
    
    try {
      const shop = await ShopModel.findById(shopId);
      const product = await ProductModel.findById(productId);

      if (!shop || !product) {
        return next(createError(400, "Shop Or Product Not Found Please Enter Valid Shop And Product"));
      }
      if (product.shopId == shop._id) {
        const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, { $set: req.body }, { new: true });
      res.status(200).json(updatedProduct);
      } else {
         return next(createError(404, "You Can Only Update Your Own Product"));
      }
   } catch (err) {
     next(createError(500,err.message));
   }
  } else {
    return next(createError(400, "Invalid ProductId"));
  }
  
 };

// Get All shop products(Tested)
export const getAllShopProducts = async (req, res, next) => {
  const id = req.params.shopId;
  const isIdValid = mongoose.Types.ObjectId.isValid(id);
  if(isIdValid){
    try {
    const products = await ProductModel.find({shopId:id});
    if (products) {
      res.status(200).json(products);
    } else {
      return next(createError(400,"No Products Available."));
    }
  } catch (err) {
    next(createError(500,err.message));
  }
  }else{
   return next(createError(400,"Invalid ProductId"));
  }
 
}

 