import mongoose from "mongoose";
import videoSchema from "./video.js";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  description: {
    type: String,
    default: "No Description",
  },
  thumbnail: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
  ],
  subscribedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    },
  ],
  likedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
  ],
  likedComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }
  ],
  subscribers: {
    type: Number,
    default: 0
  }
});


const Channel = mongoose.model("Channel", channelSchema);

export default Channel;