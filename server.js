const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    room = String(room || "").trim().slice(0, 80);
    if (!room) return;

    const size = io.sockets.adapter.rooms.get(room)?.size || 0;
    if (size >= 2) {
      socket.emit("room-full");
      return;
    }

    socket.join(room);
    socket.data.room = room;
    socket.emit("joined", { room, initiator: size === 0 });

    if (size === 1) {
      socket.to(room).emit("peer-ready");
    }
  });

  socket.on("signal", (data) => {
    const room = socket.data.room;
    if (!room) return;
    socket.to(room).emit("signal", data);
  });

  socket.on("leave", () => {
    const room = socket.data.room;
    if (room) socket.to(room).emit("peer-left");
    socket.leave(room);
    socket.data.room = null;
  });

  socket.on("disconnect", () => {
    const room = socket.data.room;
    if (room) socket.to(room).emit("peer-left");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});