import mongoose from "mongoose";
import UserModel from "../../Models/User.js";
import { validationResult } from "express-validator";
//import createError  from "../../MiddleWare/CreateError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../../MiddleWare/CreateError.js";




//create a normal user(Tested)
export const signUpUserController = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) next(createError(400, errors.array()));

    const { username, email, password } = req.body;
    const strength = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, strength);
    const user = await new UserModel({ username: username, password: hashPass, email: email });    
    try {
       
        const dbUser = await UserModel.findOne({email:email});
        
         if(dbUser) {
             return next(createError(400, "This Email Has Already Been Registered Please Use Another One."));
        }
        
        const registeredUser = await user.save();
        registeredUser ? res.sendSuccess(200, "You Were Registered Successfully Redirecting To Login Page.") : next(createError(400, "Please Try Again"));
        
    } catch (err) {
       next(createError(500,err.message));
        
    }
}


//Login a normal user
export const loginUserController = async (req, res, next) => {
    const errors = validationResult(req);
    const source = "loginUserController";
    if (!errors.isEmpty()) {
        throw createError(400, errors.array());
        return;
    }

    try {
        const existingUser = await UserModel.findOne({email:req.body.email });
        
        if (!existingUser) {
             throw createError(400, "Wrong Email or Password");
            return;
            
        }
        

        const valid = await bcrypt.compare(req.body.password, existingUser.password);
        if (!valid) {
            // res.sendError(400, "User Not Found Wrong Email or Password");
            throw createError(400, "Wrong Email or Password");
            return;
        }
        
        const { password, ...otherDetails } = existingUser._doc;
        const token = await jwt.sign({
            email: otherDetails.email,
            id:otherDetails._id,
            isAdmin: otherDetails.isAdmin
        }, process.env.JWT_SEC, { expiresIn: "1day" });
        res.cookie("authorization", token, {httpOnly: true,secure: true});
        res.status(200).json(otherDetails);

    } catch (err) {
            
        
       return next(err);
    }
}
export const logout = async (req, res, next) => {
    try {
        await res.clearCookie("authorization");
        res.sendSuccess(200,"Logout SuccessFul")
    } catch (error) {
        return next(createError(500, "INTERAL SERVER ERROR"));
    }
}

 
