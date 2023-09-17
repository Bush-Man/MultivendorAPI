import mongoose from 'mongoose';
const wishListSchema = new mongoose.Schema({
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
    //amount: { type: Number, required: true },

}, { timestamps: true });


const wishListModel = mongoose.model("WishLists", wishListSchema);
export default wishListModel;