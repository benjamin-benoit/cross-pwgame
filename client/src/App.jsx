import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import SocketProvider from '@core/context/socketContext';
import './style.css';

import {AskNickname, MagicNumber, Games } from "./core/components";

function App() {
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
  );
};
export default App;