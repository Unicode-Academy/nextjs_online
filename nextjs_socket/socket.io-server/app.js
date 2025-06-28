import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (data) => {
    console.log(data);
    socket.emit("new-message", "Hello from server");
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

httpServer.listen(3001);
