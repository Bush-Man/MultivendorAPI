import { validationResult } from "express-validator";
import ShopModel from "../../Models/Shop.js";
import userModel from "../../Models/User.js";
//import createError from "../../MiddleWare/CreateError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { createError } from "../../MiddleWare/CreateError.js";

/*
{
  "email":"sarah.w@example.com",
  "password":"hardware456"
}
{
  "email": "Bushman@example.com",
  "password": "hardware456"
}
 */


//Create a Shop
export const createNewShop = async (req, res, next)=>{
    
    
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    
    return next(createError(400, errors.array()));
  }

    const { shopName, firstName, lastName, email, password, location, phoneNumber } = req.body;
    const strength = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, strength);
    const newShop = await new ShopModel({shopName, password: hashPass,email,firstName, lastName,location, phoneNumber });
    
      
    try {
       
        const dbShop = await ShopModel.findOne({email:email});
      const isEmailRegistered = await await userModel.findOne({ email: email }); 
         if(dbShop || isEmailRegistered) {
             return next(createError(400, "Shop Already Exist"));
        }
        
        const registeredShop = await newShop.save();
        registeredShop ? res.sendSuccess(200, "Shop Created Successfully") : next(createError(400, "Please Try Again"));
        
    } catch (err) {
      
       next(createError(500,err.message));
        
    }
    

}
//Login to shop
export const loginToShop = async (req, res, next) => {
    const errors = await validationResult(req);
  if (!errors.isEmpty()) {
      
        return next(createError(400, errors.array()));
        
    }

    try {
        const myShop = await ShopModel.findOne({email:req.body.email });
        
        if(!myShop) {
             return next(createError(400, "Shop Not Found Wrong Email or Password"));
            
        }
        

        const valid = await bcrypt.compare(req.body.password, myShop.password);
        if (!valid) {
            return next(createError(400, "Shop Not Found Wrong Email or Password"));
        }
        
        const { password, ...otherDetails } = myShop._doc;
        const shopToken = await jwt.sign({
            email: otherDetails.email,
            id:otherDetails._id,
            isAdmin: otherDetails.isShopAdmin,
            isActivated:otherDetails.isActivated
        }, process.env.JWT_SHOP_SEC, { expiresIn: "1day" });
        res.cookie("shop_token", shopToken, {httpOnly: true}).status(200).json(otherDetails);//secure: true

    } catch (err) {
        console.log(err);
        next(createError(500,{message:err.message}));
    }
}
       

//Delete Shop
export const deleteShop = async (req, res, next) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
     try {
      const shop = await ShopModel.findById(id);
      if (shop) {
        await shop.deleteOne();
        res.clearCookie("shop_token");
         res.sendSuccess(200, "Shop And Cookies Deleted Successfully");
      } else {
        next(createError(404, "Shop Not Found"));
      }
        
    } catch (err) {
        next(createError(500, err.message));
    }
    
  } else {
    
    return  next(createError(404, "Invalid Id"));
  }
   


}
//get shop
export const getShop = async (req, res, next) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const dbShop = await ShopModel.findById(id);
      if (dbShop) {
        res.status(200).json(dbShop);
      
      } else {
        next(createError(404, "Shop Not Found"));
      }
    } catch (err) {
      next(createError(500, err.message));
    }

  } else {
    return next(createError(404, "Invalid Id"));
    
  }

}
//update shop
export const updateShop = async (req, res, next) => {
   const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const uShop = await ShopModel.findById(id);
      if (!uShop) {
        next(createError(404, "Shop Not Found"));
      }
      const updatedShop = await ShopModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateShop);
    } catch (err) {
      next(createError(500, err.message));
    }
  } else {
    return  next(createError(404, "Invalid Id"));
  }
};

// get All Registered Shops
export const getAllShop = async (req,res,next)=>{
  try {
    const shops = await ShopModel.find();
    if(!shops) {
      
      return next(createError(404, "No Found Shops In Database"));
    }
    res.status(200).json(shops);
  } catch (err) {
    console.log(err);
    next(createError(500,err.message));
  }
}

 