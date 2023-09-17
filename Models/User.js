import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: true,
    },
    phoneNo: {
      type: String,
      default: null
      
    },
    orders: [
      
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products', 
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, 
        },
      }
     
    ],
        location: {
          type: String,
          default:null
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", UserSchema);
export default userModel;