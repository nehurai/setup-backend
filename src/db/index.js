import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, { dbName: DB_NAME });
    console.log('\n Connected to MongoDB');
    {connectionInstance.connection.host && console.log(`MongoDB Host: ${connectionInstance.connection.host}`)}; 
  }catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
} 
export default connectDB; 