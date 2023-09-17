import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  originalPrice: {
    type: Number,
    required:[true, "Please enter your product Original Price!"]
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product discount price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  imagesUrl: [String],
  ratings: {
    type: Number,
    },
   shopId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required:[true, "Please enter your product image!"]
   }
  
},{timestamps:true});

const productModel = mongoose.model("Products", productSchema);
export default productModel;