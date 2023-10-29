import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String
    },
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: {
        type: String,
        default: "No Description",
        maxlength: 512
    },
    thumbnail: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
            required: true,
        }    
    ]
}, {timestamp: true})

const Video = mongoose.model("Video", videoSchema);

export default Video;