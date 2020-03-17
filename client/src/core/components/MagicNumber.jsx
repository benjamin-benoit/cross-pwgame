import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '@core/context'
import { useHistory } from 'react-router-dom'

const MagicNumber = () => {
    const [myNumber, setNumber] = useState(0);
    const [result, setResult] = useState("perdu");
    const io = useContext(SocketContext);
    let history = useHistory();

    useEffect(() => {
        io.on('event::sendResponse', (data) => {
            setResponse(data);
        });
    }, [io]);

    const handleNumber = event => {
        setNumber(event.target.value);
    };

    const sendNumber = () => {
        console.log(myNumber);
        io.emit("event::sendNumber", {myNumber});
    };

    // io.on("event::true", () => {
    //     setResult("gagné");
    // });

    // io.on("event::false", () => {
    //     setResult("perdu");
    // });

    // io.on("event::winner", () => {
    //     console.log("winner")
    // });

    return (
        <div>
            <span>Hello {}</span>
            <span>{result.status}</span>
            <input onChange={handleNumber} value={myNumber} ></input>
            <button onClick={sendNumber} >Send number</button>
        </div>
    )
}

export default MagicNumber;