import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    amount: { type: Number, required: true },

}, { timestamps: true });


const cartModel = mongoose.model("Products", cartSchema);
export default cartModel;