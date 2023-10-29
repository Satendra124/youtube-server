import express from 'express';
import Channel from '../schema/channel.js';
import createResponse from '../util/response.js';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from '../util/jwt.js';
import authMiddleware from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = new Channel(req.body);
        await user.save();
        res.send(createResponse({ 
            token: createToken(user),
            _id: user._id,
            email: user.email,
            name: user.name,
            description: user.description,
            thumbnail: user.thumbnail,
            
        }));
    } catch (error){
        res.send(createResponse(error.message, false));
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const user = await Channel.findOne({email: req.body.email});
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                res.send(createResponse({ 
                    token: createToken(user),
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    description: user.description,
                    thumbnail: user.thumbnail,
                }));
            } else {
                res.send(createResponse('Invalid Password', false));
            }
        } else {
            res.send(createResponse('Invalid Email', false));
        }
    } catch (error){
        res.send(createResponse(error.message, false));
    }
});

export default authRouter;