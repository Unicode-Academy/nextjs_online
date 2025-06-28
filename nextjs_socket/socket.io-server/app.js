import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
  cors: {
    origin: "http://localhost:3000",
  },
});

const messages = [];
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("send-message", (data) => {
    if (!data) {
      return;
    }
    messages.push(data);
    // socket.broadcast.emit("new-message", messages);
    socket.to("room-chat").emit("new-message", messages);
    socket.emit("new-message", messages);
  });

  socket.on("load-message", () => {
    socket.emit("new-message", messages);
  });

  socket.on("join", () => {
    socket.join("room-chat");
    socket.emit("joined");
  });

  socket.on("leave", () => {
    socket.leave("room-chat");
    socket.emit("left");
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

io.of("notification").on("connection", (socket) => {
  console.log("notification connected");
  socket.on("send-notification", (data) => {
    socket.broadcast.emit("new-notification", data);
  });
});

httpServer.listen(3001);
