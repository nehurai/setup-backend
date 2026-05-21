import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { use } from "react";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index : true
    },avatar: {
        type: String, // cloudinary url  - it store the vidoes , file and images
        required: true,
         
        default: "https://res.cloudinary.com/dzj6dhn0e/image/upload/v1700000000/default-avatar.png"
    },
    coverImage: {
        type: String, // cloudinary url  - it store the vidoes , file and images
        required: true,
        default: "https://res.cloudinary.com/dzj6dhn0e/image/upload/v1700000000/default-cover-image.png"
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, 'password is required'],
         minlength: [6, 'password must be at least 6 characters long']
    },
    refreshToken: {
        type: String,
        default: null
    }
},{timestamps: true});     
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ userId: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,

     }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ userId: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
        
     }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE });
};
const User = mongoose.model("User", userSchema);
export default User;