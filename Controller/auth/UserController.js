//import createError from "../../MiddleWare/CreateError.js";
import { createError } from "../../MiddleWare/CreateError.js";
import UserModel from "../../Models/User.js";

//delete User
export const deleteUser = async (req, res, next) => {
    try {
      const dbuser = await UserModel.findById(req.user.id);
      if (dbuser) {
        await dbuser.deleteOne();
        res.clearCookie('authorization');
        res.sendSuccess(200, "User Deleted Successfully And Cookies");
      } else {
        next(createError(404, "User Not Found"));
      }
    } catch (err) {
        next(createError(500, err.message));
    }


}
//get user
export const getUser = async (req,res,next)=>{
  try {
    const user = await UserModel.findById(req.user.id);
    if (user) {
        res.sendSuccess(200,user)
      } else {
        next(createError(404, "User Not Found"));
      }
  } catch (err) {
    next(createError(500,err.message));
  }
}
//get All users
export const getAllUsers = async (req,res,next)=>{
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(createError(500,err.message));
  }
}