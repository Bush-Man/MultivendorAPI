import mongoose from "mongoose";
const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, "Please enter your shop name!"],
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
  email: {
    type: String,
    required: [true, "Please enter your shop email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    },
  isActivated: {
    type: Boolean,
    default:true
   },
  paymentMethod: {
    type: Object,
  },
  availableBalance: {
    type: Number,
    default: 0,
  },
  isShopAdmin:{
  type: Boolean,
    default:false
  }
 
  
  
},{timeStamps:true});

const shopModel = mongoose.model("Shops", shopSchema);
export default shopModel;
// avatar: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//resetPasswordToken: String,
//resetPasswordTime: Date,
//zipCode: {
//    type: Number,
//    required: true,
 // },