import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import http from 'http';
import { Server } from 'socket.io';
import { connect } from './config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { massageRouter } from './routing/massageRouter.js'
import { userRouter } from './routing/userRouter.js'


const app = express()
const port = process.env.PORT || 4000
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = new Map();
const onlineUsers = new Map();
io.on('connection', (socket) => {
  // console.log('server connection', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    onlineUsers.set(userId, socket.id);
    console.log(`${userId} is online`);
  }

  socket.on('user_connected', (userId) => {
    users.set(userId, socket.id)
    // console.log(`User ${userId} connected with socket ${socket.id}`)
  })

  socket.on('massage', ({ senderId, receiverId, massage }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${massage}`);

    const receiverSocketId = users.get(receiverId);
    console.log(users);
    console.log('receiverSocketId = ', receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_massage', {
        senderId,
        massage,
      });
    } else {
      console.log('Receiver not online or not registered.');
    }
  });

  // Step 3: Remove user on disconnect
  socket.on('disconnect', () => {
    for (const [userId, sockId] of users.entries()) {
      if (sockId === socket.id) {
        users.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});


connect()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/', userRouter)
app.use('/api/message', massageRouter)


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})