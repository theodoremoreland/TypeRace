// React
import React, { useEffect, useRef } from 'react';

// Custom styles
import './Input.css';

export default function InputWrapper({text, callback}) {
    const inputRef = useRef();

    useEffect(() => {
        if (text === "") {
            inputRef.current.focus();
        }
    }, [text]);

    return (
            <textarea
                className="input"
                ref={inputRef}
                value={text}
                onChange={(event) => callback(event.target.value)}
            />
    );
};