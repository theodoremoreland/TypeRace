// React
import React, { useEffect, useState } from 'react';

// Custom styles
import './Timer.css';

export default function Timer({timerIsOn, delta}) {
    // delta = data that triggers useEffect upon change
    // said useEffect resets timer
    const [time, setTime] = useState();
    const [intervalID, setIntervalID] = useState();

    const startTimer = () => {
        if (intervalID !== undefined) {
            clearInterval(intervalID);
        }
        const newIntervalID = setInterval(() => setTime(prevCount => prevCount + 1), 1000);
        setIntervalID(newIntervalID);
    };

    useEffect(() => {
        if (delta && timerIsOn && time > 0) {
            setTime(0);
            startTimer();
        }

        // eslint-disable-next-line
    }, [delta])

    useEffect(() => {
        if (timerIsOn === true) {
            setTime(0);
            startTimer();
        }
        else if (time > 0 && intervalID !== undefined) {
            clearInterval(intervalID);
            setIntervalID(undefined);
            setTime(undefined);
        }

        // eslint-disable-next-line
    }, [timerIsOn]);

    return (
        <>
            {
                !Number.isNaN(time)
                    ?   <p className="timer">
                            {time}
                        </p>
                    : ""
            }
        </>
    );
};