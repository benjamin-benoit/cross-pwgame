import React, { useContext, useState } from 'react';
import { Box, Button, TextField }  from '@material-ui/core';
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
        <Box color="text.primary" className="content-center">
            <form>
                <TextField onChange={handleNickname} value={nickname} id="standard-basic" label="nickname" fullWidth="true"/>
                <Button onClick={sendNickname} variant="contained" color="primary" fullWidth="true">Send</Button>
            </form>
        </Box>
    )
}

export default AskNickname;