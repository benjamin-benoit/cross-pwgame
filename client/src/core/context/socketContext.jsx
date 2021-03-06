import React, { createContext } from 'react'
import SocketIO from 'socket.io-client'

const io = SocketIO('http://localhost:8080')
export const SocketContext = createContext(io)

const SocketProvider = ({ children }) => (
    <SocketContext.Provider value={io}>
        {children}
    </SocketContext.Provider>
);

export default SocketProvider;