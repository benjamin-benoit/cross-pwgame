import { useEffect, useState } from 'react';
import GameStatus from '../model/GameStatus';
import { useHistory } from 'react-router-dom';

export default function useReload(io) {
    const [isGameStatus, setGameStatus] = useState<GameStatus>({ number: null });

    useEffect(() => {
        io.on('event::gameStart', (data: GameStatus) => {
            console.log('game started');
            console.log(data);
            setGameStatus({ number: 1 });
        });
    }, [io]);
    
    let history = useHistory();
    
    useEffect(() => {
        if (isGameStatus.number = 0) {
            return history.push('/')
        }
        if (isGameStatus.number = 1) {
            return history.push('/Games')
        }
        if (isGameStatus.number = 2) {
            return history.push('/')
        }
    }, [history, isGameStatus.number]);
}