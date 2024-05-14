const { Server } = require('socket.io');
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // replace with your own URL if needed
  }
});
var onlineUsers = [];
io.on("connection", (socket) => {
    console.log("User connected!!");
  
    socket.on("join chat", (userId) => {
      let isUserExist = onlineUsers.find((ou) => {
        return ou.userId === userId;
      });
  
      if (isUserExist) {
        isUserExist.socketId = socket.id;
      } else {
        onlineUsers.push({
          socketId: socket.id,
          userId: userId,
        });
      }
      socket.join(userId);
      io.emit("online-users", onlineUsers);
    });
  
    socket.on("start typing", ({ currentChat, senderId }) => {
      console.log("start typing.....");
      const users = currentChat.us_chat_users;
      users.forEach((us) => {
        if (us.id !== senderId) {
          socket.to(us.id).emit("getting typing", {
            typingChat: currentChat,
          });
        }
      });
    });
  
    socket.on("stop typing", ({ currentChat, senderId }) => {
      console.log("stop typing.....");
      const users = currentChat.us_chat_users;
      users.forEach((us) => {
        if (us.id !== senderId) {
          socket.to(us.id).emit("not getting typing", {
            stopTypingChat: currentChat,
          });
        }
      });
    });
  
    socket.on("send message", (message) => {
      const users = message.us_chat_conversation.us_chat_users;
      // console.log(users);
      users.forEach((user) => {
        if (user.id !== message.senderId) {
          socket.to(user.id).emit("receive message", {
            message,
          });
        }
      });
    });
  
    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((ou) => {
        console.log(socketId, ">>>>>>>>>>>>> this is socket id")
        return ou.socketId !== socket.id;
      });
      io.emit("onlineUsers", onlineUsers);
    });
  });