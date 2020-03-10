import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 8080;

const app = express();
const server = createServer(app);
const io = socketIO(server);
let players = [];
let magicNumber: number;


app.get("/", (_, res) => {
  res.send("hello fellows");
});

io.on("connection", socket => {
  console.log("new connection");
  socket.emit("event::hello");

  socket.on("event::initialize", payload => {
    if (players.length >= 2) {
      socket.emit("event::gameFull");
      return;
    }

    players.push({id: socket.id,
      nickname: payload.nickname});
    console.log("new name received: ", payload.nickname);

    if (players.length === 2) {
      io.emit("event::gameStart");
      console.log("game started");
      const min = 0;
      const max = 1337;
      const rand = min + Math.round(Math.random() * (max - min));
      magicNumber = rand;
    }
  });


  socket.on("event::sendNumber", payload => {
    if (payload.myNumber == magicNumber) {
      console.log("true");
      io.emit("event::true");
      io.to(`${socket.id}`).emit('winner');
    } else {
      console.log("false")
      console.log(magicNumber)
      io.emit("event::false");
    }
  });
});

server.listen(PORT, () => {
  console.log("Server ready at ...");
});
