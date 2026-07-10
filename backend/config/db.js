import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb Connected SuccessFully");
    }
    catch(error){
        console.error("Mongodb connection Failed");
         console.log(error.message);
         process.exit(1);
        
    }
};
export default connectDB;