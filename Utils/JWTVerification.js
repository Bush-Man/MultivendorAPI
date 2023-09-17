import jwt from "jsonwebtoken";
import { createError } from "../MiddleWare/CreateError.js";
//import createError from "../MiddleWare/CreateError.js";


export const verifyToken = async (req, res, next) => {
  const token = await req.cookies.authorization;
  
    if (!token) {
        return next(createError(401, "Missing Headers"));

    }
    
    jwt.verify(token, process.env.JWT_SEC, async (err, payload) => {
        if (err) {
            return next(createError(401, "You Are Not Authorized"));
        }
      req.user = payload;
      
        next();
    })
}
export const verifyTokenAndAuthorization = async(req, res, next) => {
   await verifyToken(req, res,next, () => {
     if (req.params.id === req.user.id || req.user.isAdmin) {
          
            next();
        } else {
          return next(createError(400, "Not Authorized"));
        }
    })
   
    
}
export const verifyTokenAndLogout =  async(req, res, next) => {
    await verifyToken(req, res,next, () => {
        if (req.body.id === req.user.id) {
            next();
        } else {
          return next(createError(400, "Not Authorized"));
        }
    })
   
    
}

export const verifyAdmin = async(req, res, next) => {
 await verifyShopToken(req, res,next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
/////Shop token move this to separate file//////////////////
export const verifyShopToken = async (req, res, next) => {
    const stoken =  await req.cookies.shop_token;
    if (!stoken) {
        return next(createError(401, "Missing Headers Not Authorized"));

    }
    
    jwt.verify(stoken, process.env.JWT_SHOP_SEC, async (err, payload) => {
        if (err) {
            return next(createError(401, "You Are Not Authorized"));
      }
      
      req.shop = payload;
      
        next();
    })
}
export const verifyShopUpdateOrDeleteAuthorization = async(req, res, next) => {
   await verifyShopToken(req, res,next, () => {
    if (req.shop.id === req.params.id) {
      next();
    } else {
      return next(createError(400, "You Can Only Delete Or Update Your Own Shop"));
    }
  })
}
export const verifyAuthorizationAndShopToken = async (req, res, next) => {
  await verifyShopToken(req, res, next,() => {
        if (req.shop.isActivated) {
            next();
        } else {
          return next(createError(400, "Not Authorized"));
        }
    })
   
    
}

export const verifyShopsAdmin = async(req, res, next) => {
 await verifyShopToken(req, res,next, () => {
    if (req.shop.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
