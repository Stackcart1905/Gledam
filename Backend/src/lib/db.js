// import mongoose from "mongoose";

// const connectDB = async () => {
//      try {
//         await mongoose.connect(process.env.MONGO_URL).then(
//             ()=> console.log("MongoDB connected successfully")      
//         )
//      } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//      }
// }

// export {connectDB} ; 


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};


export {connectDB} ; 