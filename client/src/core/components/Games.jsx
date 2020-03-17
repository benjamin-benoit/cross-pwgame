import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '@core/context'
import { useHistory } from 'react-router-dom'

const Games = () => {
    const [myNumber, setNumber] = useState(0);
    const [result, setResult] = useState("perdu");
    const [gameStarted, setGameStarted] = useState(false);
    const io = useContext(SocketContext);
    let history = useHistory()

    useEffect(() => {
        io.on('event::sendResponse', (data) => {
            setResponse(data);
        });
        io.on('event::gameStarted', () => {
            setGameStarted(true);
            console.log(gameStarted);
        });
    }, [io]);

    const magicNumber = () => {
        history.push('/magicNumber')
    };

   

    if (!gameStarted) {
        return (
            <div>
                <span>Please, wait for a player</span>
            </div>
        )
    } else {
        return (
            <div>
                <span>Hello choose a game</span>
                <button onClick={magicNumber} >Magic Number</button>
            </div>
        )
    }
}

export default Games;