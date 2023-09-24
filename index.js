const express = require("express");
const app = express();
const cors = require("cors");
require("./mongoConnect.js"); // database connection file
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const socket = require("socket.io");

// load environment variables
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());

// use imported route file
app.use("/api/auth", userRoute);
app.use("/api/messages", messageRoute);

// server running port
const server = app.listen(process.env.PORT, () => {
  console.log(`server running on port : ${process.env.PORT}`);
});

// console.log(server);

const io = socket(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
