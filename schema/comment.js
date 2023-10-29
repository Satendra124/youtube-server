import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 512
    },
    commentedBy: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;