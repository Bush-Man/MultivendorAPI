import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
      required: [true,"User ID Missing in Request"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products', 
      required:[true, "Product Id Missing in Request"]
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shops', 
      required:[true, "Shop Where You Bought Missing"]
    },
    rating: {
      type: Number,
      required:[ true,"Minimum Rate is 1 And Maximum is 5"],
      min: 1,
      max: 5, 
    },
    title: {
      type: String,
      required: [true,"Title Missing"],
      trim: true,
      minlength: 5, 
      maxlength: 100, 
    },
    description: {
      type: String,
      required: [true,"Description Missing"],
      trim: true,
      minlength: 10, 
      maxlength: 1000, 
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const ReviewModel = mongoose.model('Reviews', reviewSchema);

export default ReviewModel
