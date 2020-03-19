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
    const min = 0;
    const max = 1337;
    const rand = min + Math.round(Math.random() * (max - min));
    magicNumber = rand;

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
    console.log(magicNumber);
    console.log(number);

    switch (true) {
        case magicNumber > number:
            io.to(socket.id).emit('event::sendResponse', {
                response: 'More',
            });
            break;
        case magicNumber < number:
            io.to(socket.id).emit('event::sendResponse', {
                response: 'Less',
            });
            break;
        case magicNumber == number:
            io.to(socket.id).emit('event::sendResponse', {
                response: 'You win',
            });
            // const player = players.find(player => player.nickname == payload.nickname);
            // player.score += 1; 
            // player.score !== 3 ? io.emit("event::newParty", { players }) : socket.emit("event::endGame", { player })
            break;
          default:
            io.to(socket.id).emit('event::sendResponse', {
                response: 'Fail',
            });
            break;
        }
    });
});

server.listen(PORT, () => {
  console.log("Server ready at ...");
});
