import express from 'express';
import authMiddleware from '../middleware/auth.js';
import Channel from '../schema/channel.js';
import Video from '../schema/video.js';
import createResponse from '../util/response.js';
import Comments from '../schema/comment.js';

const videoRouter = express.Router();

videoRouter.get('/', authMiddleware , async(req, res) => {
    try {
        // give videos of subscribed channels and then random video upto 20 size
        const videos = [];
        const channel = await Channel.findById(req.user._id);
        for(let i = 0; i<channel.subscribedTo.length; i++){
            const subscribedChannel = await Channel.findById(channel.subscribedTo[i]._id);
            for(let j = 0; j<subscribedChannel.videos.length; j++){
                videos.push(subscribedChannel.videos[j]);
            }
        }
        const len = videos.length;
        let videosFromdb = await Video.find();
        // filter out above entered videos
        videosFromdb = videosFromdb.filter((video) => {
            return !videos.includes(video);
        })
        for(let i = 0; i< Math.min( videosFromdb.length, 20 - len) ; i++){
            videos.push(videosFromdb[i]);
        }
        return res.send(createResponse(videos));
    } catch (error) {
        return res.send(createResponse(error.message, false));
    }
})

videoRouter.post('/' ,authMiddleware, async (req,res)=>{
    try {
        const id = req.user._id;
        // add video to the channel
        const video = new Video(req.body);
        video.channel = id;
        const channel = await Channel.findById(id);
        await video.save();
        channel.videos.push(video._id);
        await channel.save();
        res.send(createResponse(video));
    } catch (error) {
        res.send(createResponse(error.message, false));
    }
});


videoRouter.get('/:id', authMiddleware, async (req, res)=> {
    try{
        const videoId = req.params.id;
        const video = await Video.findById(videoId);
        await video.populate('comments');
        await video.populate('channel');
        res.send(createResponse(video));
    }catch(error){ 
        res.send(createResponse(error.message, false));
    }
})

videoRouter.get('/:id/like', authMiddleware, async (req, res) => {
    try {
        const videoId = req.params.id;
        const video = await Video.findById(videoId);
        const channel = await Channel.findById(req.user._id);
        if (channel.likedVideos.includes(videoId)) {
            channel.likedVideos.pull(videoId);
            video.likes = video.likes - 1;
        } else {
            video.likes = video.likes + 1;
            channel.likedVideos.push(videoId);
        }
        await video.save();
        await channel.save();
        res.send(createResponse(video));
    } catch (error) {
        res.send(createResponse(error.message, false));
    }
})

videoRouter.post('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const name = req.user.name;
        const videoId = req.params.id;
        const video = await Video.findById(videoId);
        req.body.commentedBy = name;
        const comment = new Comments(req.body);
        await comment.save();
        video.comments.push(comment._id);
        await video.save();
        res.send(createResponse(comment));
    } catch (error) {
        res.send(createResponse(error.message, false));
    }
})

export default videoRouter;