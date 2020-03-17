import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import socketIO from "socket.io-client";
import { SocketProvider } from '@core/context';

import {AskNickname, MagicNumber, Games } from "./core/components";

const App = () => {
  // const [isGameStarted, setGameStarted] = useState(false);
  // const io = socketIO("http://localhost:8080");

  // io.on("event::hello", () => {
  //   console.log("handshake");
  // });

  // io.on("event::gameStart", () => {
  //   console.log("game started front");
  //   setGameStarted(true);
  // });

  return (
    <SocketProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={AskNickname} />
          <Route exact path='/magicNumber' component={MagicNumber} />
          <Route exact path='/games' component={Games} />
        </Switch>
      </Router>
    </SocketProvider>
    // <section className="hero is-fullheight is-light">
    //   <div className="hero-head">
    //     <div className="container">
    //       <div className="tabs is-centered">
    //         <ul>
    //           <li>
    //             <a>PWA Games</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="hero-body">
    //     <div className="container">
    //         <div className="tabs is-centered">
    //           {!isGameStarted ? <AskNickname io={io} /> : <MagicNumber io={io} />}
    //         </div>
    //     </div>
    //   </div>

    //   <div className="hero-foot">
    //     <div className="container">
    //       <div className="tabs is-centered">
    //         <ul>
    //           <li>
    //             <a>Let's Rock!</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default App;
