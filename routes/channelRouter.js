import express from 'express';
import authMiddleware from '../middleware/auth.js';
import createResponse from '../util/response.js';
import Channel from '../schema/channel.js';

const channelRouter = express.Router();


channelRouter.get('/', authMiddleware, async (req, res) => {
    try {
        const id = req.user._id;
        const user = await Channel.findById(id);
        console.log(req.headers.authorization);
        await user.populate('videos');
        await user.populate('subscribedTo');
        res.send(createResponse(user));
    } catch (error) {
        res.send(createResponse(error.message, false));
    }
});

channelRouter.get('/subscribe/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Channel.findById(req.user._id);
        const tosubscribe = await Channel.findById(id);
        if (user.subscribedTo.includes(id)) {
            user.subscribedTo.pull(id);
            tosubscribe.subscribers = tosubscribe.subscribers - 1;
        } else {
            user.subscribedTo.push(id);
            tosubscribe.subscribers = tosubscribe.subscribers + 1;
        }
        await tosubscribe.save();
        await user.save();
        res.send(createResponse(user));
    } catch (error) {
        res.send(createResponse(error.message, false));
    }
});

export default channelRouter;