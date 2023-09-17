//import createError from "../../MiddleWare/CreateError.js";
import { createError } from "../../MiddleWare/CreateError.js";
import wishListModel from "../../Models/WishList.js";


//Create Order(only logged in user)
export const createWishList = async (req, res, next) => {
    const buyerId = req.body.userId;
    const products = req.body.products;
    const amount = req.body.amount;
    if (!buyerId || !products) {
      return next(createError(400, "Please fill All Inputs"));
    }
    
    try {
        const buyer = await UserModel.findById(buyerId);
        if (!buyer) {
            return next(createError(400, "Please Create An Account"));
        }

        const newWishlist = await new wishListModel({ userId: buyer._id, products:products});
         
        const savedWishlist = await newWishlist.save();
        res.sendSuccess(200,`Successfully Created A Wishlist with Id${ savedWishlist._id}`);
        
        
    } catch (err) {
       next(createError(500,err.message));
        
    }
    

}


//Delete Item in Wishlist
export const deleteWish = async (req, res, next) => {
    try {
      const wish = await wishListModel.findById(req.params.id);
      if (wish) {
        await wish.deleteOne();
        res.sendSuccess(200, "Wish Deleted Successfully");
        
      } else {
        next(createError(200, "Wish Not Found"));
       }
        
    } catch (err) {
        next(createError(500, err.message));
    }


}
//get Single Wish
export const getWish = async (req,res,next)=>{
  try {
    const wishItem = await wishListModel.findById(req.params.id);
    res.status(200).json(wishItem);
  } catch (err) {
    next(createError(500,err.message));
  }
}

//update Order
// export const updateShop = async (req, res, next) => {
//   try {
//     const updatedShop = await Hotel.findByIdAndUpdate(
//       req.shop.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updateShop);
//   } catch (err) {
//     next(createError(500,err.message));
//   }
// };

// Get All WishList Items


//Get full wishlist
export const getWishList = async (req, res, next) => {
  
  try {
    const wishList = await wishListModel.find();
    if (wishList) {
      res.status(200).json(wishList);
    }
  } catch (err) {
    next(createError(500,err.message));
  }
}
