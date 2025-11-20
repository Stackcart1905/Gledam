import mongoose from "mongoose";


const cartSchema = 
new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
        required : false  , 
    }  , 
    // For guest carts before authentication
    cartToken: {
        type: String,
        index: true,
        unique: true,
        sparse: true,
    }, 

    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId  , 
                ref : "Product" , 
                required : true , 
            } , 
            quantity : {
                type : Number , 
                required : true , 
                min : 1 , 
                default : 1 , 

            }
        }
    ],
    couponCode: {
        type: String,
        default: null
    },
    discountAmount: {
        type: Number,
        default: 0
    }
} , {timestamps : true}) ; 

const Cart = mongoose.model("Cart" , cartSchema) ; 

export default Cart ; 