import { useEffect, useState } from 'react';
import './roundResults.css';

function Timer({ timer }) {
    const [active, setActive] = useState(false);
    const [time, setTime] = useState(timer); // single source of truth

    // Initialize timer
    useEffect(() => {
        setTime(timer);
        setActive(true);
    }, [timer]);

    // Interval logic
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

    return (
        <div className='roundDisplay'>
            <div className='background fade'>
                <div style={{ color: "white", height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10rem' }}>
                    {minutes}:{seconds.toString().padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}

export default Timer;