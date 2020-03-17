import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 8080;

const app = express();
const server = createServer(app);
const io = socketIO(server);
let players: any[] = [];
let magicNumber: number;


app.get("/", (_, res) => {
  res.send("hello fellows");
});

io.on("connection", socket => {
  console.log("new connection");
  socket.emit("event::hello");

  socket.on("event::initialize", payload => {
    console.log(payload)
    players.push({ nickname: payload.nickname, score: 0 });
    // if (players.length == 1) {
    //   io.to(socket.id).emit('event::gameStarted'
      // , {
        //     number: 0
      // }
  //     );
  //     return;
  // }
  if (players.length === 2) {
    console.log("2 players")
    io.emit('event::gameStarted', { players });
    console.log(players)
      // , {
      //     number: 0
      // }
  }
  });
  // if (players.length > 2) {
  //     io.to(socket.id).emit('event::gameStarted'
      // , {
      //     number: 0
      // }
      // );
  // }
  
  socket.on('event::sendNumber', payload => {
    const number: number = payload.myNumber as number;
    console.log('joueur', payload.nickname, number);
    console.log(payload);

    switch (true) {
        case magicNumber > number:
            io.to(socket.id).emit('event::sendResponse', {
                status: false,
                response: 'Trop Petit',
            });
            console.log("Trop Petit");
            break;
        case magicNumber < number:
            io.to(socket.id).emit('event::sendResponse', {
                status: false,
                response: 'Trop grand',
            });
            console.log("Trop grand");
            break;
        case magicNumber == number:
            io.to(socket.id).emit('event::sendResponse', {
                status: true,
                response: 'Félicitations tu as gagné',
            });
            console.log("Trop grand");
            break;
          default:
            io.to(socket.id).emit('event::sendResponse', {
                status: false,
                response: 'ohohoh failed',
            });
            console.log("ohohoh failed");
            break;
        }
    });
});

server.listen(PORT, () => {
  console.log("Server ready at ...");
});
