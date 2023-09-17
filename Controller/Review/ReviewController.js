import ReviewModel from "../../Models/Review.js";
import ShopModel from "../../Models/Shop.js";
import ProductModel from '../../Models/Product.js';
import UserModel from "../../Models/User.js";
import OrderModel from "../../Models/Order.js";
import { createError } from "../../MiddleWare/CreateError.js";
import mongoose from "mongoose";


//Create a Review
export const createReview = async (req, res, next) => {
    //verify purchase
    // get product id from params
    //get logged in user from token

    //create review window open 
    //create review only once
    const { rating, title, description } = req.body;
    const productId = req.params.id.trim();
    
    try {
        const prod = await ProductModel.findById(productId);
        
        if (!prod) {
            return next(createError(404, "Product Not Found"));

        }
        
        const seller = req.shop && await ShopModel.findById(req.shop.id);
        if (seller) {
            return next(createError(404, "A Shop Owner Can't Review Their Own Products."));
            
        }
       
        const isPurchased = await UserModel.exists({ 'orders.product': {$in: [prod._id]}});
        if ( isPurchased && !(isPurchased==null)) {
            const reviewExists = await ReviewModel.exists({
                user: new mongoose.Types.ObjectId(req.user.id),
                product: new mongoose.Types.ObjectId(prod._id)
            });
            
            if (!reviewExists) {
                const newReview = await new ReviewModel({ buyer: req.user.id, product: prod._id,shop:prod.shopId ,rating, title, description });
                try {
                    const savedReview = await newReview.save();
                    res.sendSuccess(200, "Reviewed The Product Successfully")

                } catch (error) {
                    console.log(error);
                    return next(createError(404, error));
 
                }

            } else {
                return next(createError(400, "You Can Only Review A Product Once "));
            }
            }else {
                return next(createError(400, "You Can Only Review A Product You Purchased"));
                
            }
        } catch (error) {
            console.log(error);
        }


}
//Get all reviews for a single product    
export const getAllProductsReviews = async (req, res, next) => {
    const id = req.params.id.trim();
    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const dbProduct = await ProductModel.findById(id);
            if (dbProduct) {
                 const productReviews = await ReviewModel.find({ product: dbProduct._id});
            if (productReviews.length>=1) {
                res.status(200).json(productReviews);
            } else {
                return next(createError(400, "No Reviews Yet Subsribe To Our NewsLetter To Keep you Updated On Its Reviews"));
                
            }
            } else {
        return next(createError(400, "Product ID Not Valid."));
                
            }
           
        } catch (error) {
            
        }
    } else {
        return next(createError(400, "Product ID Not Valid"));
        
    }
}














//Admin Get All Reviews
export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await ReviewModel.find();
        if (reviews) {
            res.status(200).json(reviews);
        } else {
           return next(createError(404, "No Product Reviews"));
        }
    } catch (error) {
        return next(createError(500,"INTERNAL SERVER ERROR TRY AGAIN"))
    }
}
