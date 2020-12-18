// React
import React, { useEffect, useRef } from 'react';

// Semantic UI
import { Input } from 'semantic-ui-react';

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
        <Input
            className="input"
            fluid
            ref={inputRef}
            value={text}
            onChange={(event) => callback(event.target.value)}
        />

    );
};