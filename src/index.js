import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with an error code
    });
/*
import express from "express"
const app = express();
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.on("error", (error) => {
        console.log(error);
        throw error;
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
    catch (error) {
        console.log(error);

    }
})();     
*/  