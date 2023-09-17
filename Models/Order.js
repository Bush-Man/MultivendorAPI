import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    shopId: {
        type: String,
        required: [true,"Shop ID Required"]
    },
    buyerId: {
        type: String,
        required:[true,"Buyer ID Required"]
    },
    orderDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  deliveryDate: {
    type: Date,
    
  },
    products: [
         {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      quantity: {
        type: Number,
          required: true,
        
      },
    },

    ],
        
    
    amount: { type: Number, required: true },
    payment: { type: String, required: true },
    status: { type: String, default: "pending" },

}, { timestamps: true });

const orderModel = mongoose.model("Orders", orderSchema);
export default orderModel;