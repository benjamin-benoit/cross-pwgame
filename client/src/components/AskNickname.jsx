import React, { useState } from 'react';
import {Button, TextField}  from '@material-ui/core';

const AskNickname = ({io}) => {
    const [nickname, setNickname] = useState("");

    const handleNickname = event => {
        setNickname(event.target.value);
    };

    const sendNickname = () => {
        io.emit("event::initialize", {nickname});
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