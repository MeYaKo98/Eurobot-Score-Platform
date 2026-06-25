import { useEffect, useState } from 'react';
import './timer.css';

function Timer({ timer }) {
    const [active, setActive] = useState(false);
    const [time, setTime] = useState(timer);

    useEffect(() => {
        setTime(timer);
        setActive(true);
    }, [timer]);

    useEffect(() => {
        if (!active) return;

        const intervalId = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    setActive(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [active]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const isWarning = time > 0 && time <= 10;

    return (
        <div className='timer-display'>
            <div className={`huge-clock ${isWarning ? 'pulse-warning' : ''}`}>
                {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
        </div>
    );
}

export default Timer;