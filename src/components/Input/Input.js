// React
import React from 'react';

// Custom styles
import './Input.css';

export default function InputWrapper({text, callback, inputRef}) {
    return (
            <textarea
                className="input"
                ref={inputRef}
                value={text}
                onChange={(event) => callback(event.target.value)}
            />
    );
};