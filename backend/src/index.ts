import dotenv from "dotenv";
dotenv.config();
import path from "path"
import express, { Application, Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import signupRoute from "./routes/signupRoute";
import signinRoute from "./routes/signinRoute";
import blogRoute from "./routes/blogRoute";
import userRoute from "./routes/userRoute";
import { createServer } from "http";
import { Server } from "socket.io";
import { AddComments } from "./controllers/AddComments";
import { Secret } from "./config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { dirname } from "path";




const PORT = process.env.PORT || 3000;
const _dirName = path.resolve(__dirname, "../..");
console.log(_dirName)
const app: Application = express();

app.use(express.json());
app.use(cookieParser()); 
app.use('/uploads', express.static('uploads'));
app.use('/uploadProfile', express.static('uploadProfile'));


app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/blog", blogRoute);
app.use("/profile", userRoute);
app.use(express.static(path.join(_dirName,"client","dist")))
app.get('*',(req:Request,res:Response)=>{
  res.sendFile(path.join(_dirName,"client","dist","index.html"))
})

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("message", (message) => {
    console.log(message);
  });

  socket.on("new-comment", async (data) => {
    const { blogId, comment, username } = data;

    try {

      if (!username) {
        socket.emit("comment-status", { code: 401, msg: "Invalid Token" });
        return;
      }

      const req: any = { body: { comment,blogId }, username };

      const res = {
        status: (code: number) => ({
          json: (msg: any) => {
            socket.emit("comment-status", { code, msg });
            return res;
          },
        }),
      } as unknown as Response;

      await AddComments(req, res);
      io.emit("comment-added", { blogId, comment, username });
    } catch (error) {
      console.log("JWT Error:", error);
      socket.emit("comment-status", { code: 401, msg: "Invalid Token" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const mongodbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI || "");
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Error:", e);
  }
};

mongodbConnect();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
