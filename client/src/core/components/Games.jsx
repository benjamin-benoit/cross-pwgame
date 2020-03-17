import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, TextField }  from '@material-ui/core';
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
    useEffect(() => {
        io.on('event::gameStarted', (player) => {
            setGameStarted(true);
            console.log(player);
            console.log(gameStarted);
        });
    }, []);

    const magicNumber = () => {
        history.push('/magicNumber')
    };

   

    if (!gameStarted) {
        return (
            <div className="content-center">
                <span>Please, wait for a player</span>
            </div>
        )
    } else {
        return (
            <Box color="text.primary" className="content-center topbottom-margin">
                <form>
                    <span className="full">Hello choose a game</span>
                    <Button onClick={magicNumber} variant="contained" color="primary" fullWidth="true" >Magic Number</Button>
                </form>
            </Box>
        )
    }
}

export default Games;