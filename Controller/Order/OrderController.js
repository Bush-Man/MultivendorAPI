import OrderModel from "../../Models/Order.js";
import ShopModel from "../../Models/Shop.js";
import UserModel from "../../Models/User.js";
import ProductModel from "../../Models/Product.js";
import { createError } from "../../MiddleWare/CreateError.js";
//import createError from "../../MiddleWare/CreateError.js";
import Stripe from 'stripe';
import mongoose from "mongoose";


//Create Order(only logged in user)
export const createOrder = async (req, res, next) => {
    
  const products = req.body.products;
  if (!Array.isArray(products) || products.length === 0 || !req.user.id) {
    return next(createError(400, "No valid Products"));
  }
  let dbProd;
  let dbshop;
  let validProducts = [];
  let totalAmount = 0;
  
  try {
    try {
      await Promise.all(products.map(async (product) => {
        try {
          dbProd = await ProductModel.findById(product._id);
          
          dbshop = await ShopModel.findById(dbProd.shopId);
         
         
          if (dbProd && dbshop) {
            if (product.quantity >= 1) {
              validProducts.push({ product: dbProd, quantity: product.quantity });
              totalAmount += dbProd.discountPrice * product.quantity;
            } else {
              return next(createError(400, "Product Quantity Can't Be 0"));
            }
          } else {
            return next(createError(400, "No valid Product or Shop"));
          }
        } catch (e) {
          console.log(e);
      
        }
      }));
    } catch (err) {
      // Handle errors that might have occurred during the Promise.all block.
      console.log(err);
    }
  console.log(validProducts);
    const line_items = await Promise.all(validProducts.map((prod) => {
     
      
      return {
        price_data: {
          currency: "usd",
          unit_amount: prod.product.discountPrice * 100,
          product_data: {
            name: prod.product.title,
            description: `Shop ID: ${prod.product.shopId}`,
            metadata: {
              productDescription: prod.product.description,
              productCategory: prod.product.category,
              productPrice: prod.product.discountPrice,
              
                

            }
              
              
          },
        },
        quantity: prod.quantity,
      }
    }));
    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      success_url: "https://myshopmultivendor.onrender.com/success",
      cancel_url: "https://myshopmultivendor.onrender.com/fail",
    });
      
    const newValidOrder = await new OrderModel({ buyerId:req.user.id, shopId:dbshop._id, products: validProducts.map((prod) => ({
    product: prod.product, 
    quantity: prod.quantity,
  })), amount: totalAmount, payment: session.id });
    await UserModel.findByIdAndUpdate(req.user.id, {$push: { orders: {$each:validProducts} }},{new:true});
      
        const savedOrder = await newValidOrder.save();
    res.status(200).json({...savedOrder,session });   
    } catch (err) {
      console.log(err);
       next(createError(500,err.message));
        
    }
    

}


//Cancel Order(Not Yet Implemented In OrderRoute)
export const cancelOrder = async (req, res, next) => {
    try {
      const order = await OrderModel.findById(req.params.id);
      if (order) {
        await order.deleteOne();
        res.sendSuccess(200, "Order Cancelled Successfully");
        
      } else {
        next(createError(200, "Order Not Found"));
       }
        
    } catch (err) {
        next(createError(500, err.message));
    }


}
//get an Order
export const getOrder = async (req,res,next)=>{
  try {
    const userOrder = await OrderModel.findById(req.params.id);
    res.status(200).json(userOrder);
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

// User Requesting for all their orders
export const getOrders = async (req, res, next) => {
  
  try {
    const orders = await OrderModel.find();
    if (orders) {
      res.status(200).json(orders);
    }
  } catch (err) {
    next(createError(500,err.message));
  }
}

//Admin Requesting all users orders
export const getAllOrders = async (req, res, next) => {
  
  try {
    const allOrders = await OrderModel.find();
    if (allOrders) {
      res.status(200).json(allOrders);
    }
  } catch (err) {
    next(createError(500, err.message));
  }
}
/*
  const fetchProducts = async () => {
                try {
                  dbProd = await ProductModel.findById(product.id);
                  
                  dbshop = await ShopModel.findById(dbProd.shopId);
                  
                    if (dbProd && dbshop) {
                      if (product.quantity >= 1) {
                          
                           await validProducts.push(dbProd);
                           totalAmount += dbProd.discountPrice * product.quantity;
                           
                        } else {
                        return next(createError(400, "Product Quantity Can't Be 0"));                           
                        }
                    } else {
                        return next(createError(400, "No valid Product or Shop"));
                    }
                } catch (e) {
                    console.log(e);
                }
             
                
            }
          fetchProducts();
          
      });
*/
