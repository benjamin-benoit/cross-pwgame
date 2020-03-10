import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import AskNickname from "./components/AskNickname";
import MagicNumber from "./components/MagicNumber";

const App = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const io = socketIO("http://localhost:8080");

  io.on("event::hello", () => {
    console.log("handshake");
  });

  io.on("event::gameStart", () => {
    console.log("game started front");
    setGameStarted(true);
  });

  return (
    <section className="hero is-fullheight is-light">
      <div className="hero-head">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>PWA Games</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hero-body">
        <div className="container">
          <header className="bd-index-header">
            {!isGameStarted ? <AskNickname io={io} /> : <MagicNumber io={io} />}
          </header>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>Let's Rock!</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
