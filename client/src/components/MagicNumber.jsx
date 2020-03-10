import React, { useState } from 'react';

const MagicNumber = ({io}) => {
    const [myNumber, setNumber] = useState(0);
    const [result, setResult] = useState("perdu");

    const handleNumber = event => {
        setNumber(event.target.value);
    };

    const sendNumber = () => {
        console.log(myNumber);
        io.emit("event::sendNumber", {myNumber});
    };

    io.on("event::true", () => {
        setResult("gagné");
    });

    io.on("event::false", () => {
        setResult("perdu");
    });

    io.on("event::winner", () => {
        console.log("winner")
    });

    return (
        <div>
            <span>{result}</span>
            <input onChange={handleNumber} value={myNumber} ></input>
            <button onClick={sendNumber} >Send number</button>
        </div>
    )
}

export default MagicNumber;