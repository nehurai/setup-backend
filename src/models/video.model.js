import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,       
        required: true,
        trim: true,
        index : true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail:{
        type: String, // cloudinary url  - it store the vidoes , file and images
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index : true
    },
    videoUrl: {
        type: String, // cloudinary url  - it store the vidoes , file and images
        required: true,
    },
    thumbnailUrl: {
        type: String, // cloudinary url  - it store the vidoes , file and images    
        required: true,
    },
    duration: {
        type: Number, // in seconds 
        required: true,
    },
    views: {
        type: Number,   
        default: 0,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    tags: [{
        type: String,
        trim: true,
        index : true    
    }], 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    } 
},{timestamps: true});
videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
export default Video;