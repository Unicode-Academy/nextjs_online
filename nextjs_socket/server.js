import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
  const io = new Server(server, {});
  io.use((socket, next) => {
    // console.log(socket.handshake.auth.token);

    // next(new Error("unauthorized"));

    next();
  });
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("send-notification", (data) => {
      console.log(data);
      console.log(socket.handshake.auth.token);
      socket.emit("new-notification", data);
    });
  });
  server.listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
