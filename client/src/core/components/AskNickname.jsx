import React, { useContext, useState } from 'react';
import {Button, TextField}  from '@material-ui/core';
import { SocketContext } from '@core/context'
import { useHistory } from 'react-router-dom'

const AskNickname = () => {
    const [nickname, setNickname] = useState("");
    const io = useContext(SocketContext);
    let history = useHistory()

    const handleNickname = event => {
        setNickname(event.target.value);
    };

    const sendNickname = () => {
        io.emit("event::initialize", {nickname});
        history.push('/games')
    };

    return (
        <div>
            <form>
                <TextField onChange={handleNickname} value={nickname} id="standard-basic" label="Standard" />
                <Button onClick={sendNickname} variant="contained" color="primary">Send</Button>
            </form>
        </div>
    )
}

export default AskNickname;