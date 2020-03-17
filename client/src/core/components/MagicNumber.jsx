import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, TextField }  from '@material-ui/core';
import { SocketContext } from '@core/context'
import { useHistory } from 'react-router-dom'

const MagicNumber = () => {
    const [myNumber, setNumber] = useState(0);
    const [result, setResult] = useState("perdu");
    const io = useContext(SocketContext);
    let history = useHistory();

    useEffect(() => {
        io.on('event::sendResponse', (data) => {
            setResult(data);
        });
    }, [io]);

    const handleNumber = event => {
        setNumber(event.target.value);
    };

    const sendNumber = () => {
        console.log(myNumber);
        io.emit("event::sendNumber", { myNumber: myNumber });
    };

    return (
        <div>
            <span fullWidth="true">Hello {}</span>
            <TextField onChange={handleNumber} value={myNumber} fullWidth="true"/>
            <Button onClick={sendNumber} variant="contained" color="primary" fullWidth="true">Send number</Button>
            <span fullWidth="true">{result.response}</span>
        </div>
    )
}

export default MagicNumber;