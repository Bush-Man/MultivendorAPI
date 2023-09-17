import validator from "express-validator";
import  { body} from 'express-validator';
export const validateUserInput = [
  body("username") && body("username").trim().isLength({ min: 3 }).escape(),
   body("email") && body("email").trim().isEmail().normalizeEmail(),
    body("password") && body("password").trim().isLength({ min: 6 }).escape()

]

   
export const validateShopInput = [
    body("shopName") && body("shopName").trim().isLength({ min: 3 }).escape(),
    body("firstName") && body("firstName").trim().isLength({ min: 3 }).escape(),
    body("lastName") && body("lastName").trim().isLength({ min: 3 }).escape(),
    body("email") && body("email").trim().isEmail().normalizeEmail(),
    body("password") && body("password").trim().isLength({ min: 6 }).escape(),
    body("location") && body("location").trim().isLength({ min: 1 }).escape(),
    body("phoneNumber") && body("phoneNumber").trim()
]
export const validateLoginInput = [
    body("email") && body("email").trim().isEmail().normalizeEmail(),
    body("password") && body("password").trim().isLength({ min: 6 }).escape(),
]
//  export const validateProductInput = [
//     body("name") && body("name").trim().isLength({ min: 3 }).escape(),
//    body("email") && body("email").trim().isEmail().normalizeEmail(),
//   body("password") && body("password").trim().isLength({ min: 6 }).escape(),
//      body("firstName") && body("firstName").trim().isLength({ min: 3 }).escape(),
//      body("lastName") && body("lastName").trim().isLength({ min: 3 }).escape(),
//    body("phoneNumber") && body("phoneNumber").trim().isEmail().normalizeEmail(),
//     body("password") && body("password").trim().isLength({ min: 6 }).escape()
//  ]
    
export const validateProductInput = [
body("title") && body("title").trim().isLength({ min: 3 }).escape(),
body("description") && body("description").trim().isLength({ min: 3 }).escape(),
body("category") && body("category").trim().isLength({ min: 3 }).escape(),
body("originalPrice") && body("originalPrice").isNumeric().escape(),
body("discountPrice") && body("discountPrice").isNumeric().escape(),
body("stock") && body("stock").isInt().escape()


    ]
    
        
    
