import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import videoRouter from "./routes/videoRouter.js";
import channelRouter from "./routes/channelRouter.js";

const port = 8080;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/youtube")
.then(()=>{
    console.log("connected to db");
}).catch(()=>{
    console.log("failed to connect to db");
})

app.use('/auth',authRouter);
app.use('/video',videoRouter);
app.use('/channel', channelRouter);

app.get("/", (req, res) => {
    res.send({ message: "welcome to youtube"});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});