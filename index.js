import express from "express";
import db from "./database/db.js";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import groupRouter from "./routes/group.routes.js";

const app = express();

const httpServer = http.createServer(app);

// const io = new Server(httpServer);

const io = new Server(httpServer, { cors: { origin: "*" } });

// Socket.IO
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a room for a specific chat
  socket.on('join room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for new messages and broadcast them
  socket.on('send message', async (data) => {
    const { sender, receiver, content, roomId } = data;

    // Save the message to the database
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();

    // Emit the message to other users in the room
    io.to(roomId).emit('receive message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// io.on("connection", (socket) => {
//   console.log(`User connected : ${socket.id} `);

//   socket.on("join room", (room) => {
//     socket.join(room);
//     console.log(`User joined room : ${room}`);
//   });

//   socket.on("send_message", (data) => {
//     io.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// for connecting backend and frontend

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/group", groupRouter);

httpServer.listen(7800, () => {
  db();
  console.log(`Server is running on http://localhost:7800`);
});
