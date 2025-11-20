import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
   fullName : {
    type : String , 
    required : true , 
    trim : true  , 
   } , 
   email : {
    type : String , 
    required : true , 
    lowercase: true, 
     unique : true  , 
     trim : true , 
   } , 
   // For legacy auth this may exist; for Clerk users this can be omitted
   password : {
    type : String , 
    required : false , 
   } , 
   // Clerk user id linkage
   clerkUserId: {
     type: String,
     index: true,
     unique: true,
     sparse: true,
   },
   isVerified: 
    { 
    type: Boolean,
     default: false
    },

   role : {
    type : String  , 
    required : true , 
    enum: ["user", "admin", "owner"],
    default : "user" , 
   } , 
} , {timestamps : true})  ; 


const User =  mongoose.model("User" , userSchema) ; 

export default User ; 