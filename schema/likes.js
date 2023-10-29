import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    videoId: {
        type: String,
    },
    commentId: {
        type: String
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default likeSchema;