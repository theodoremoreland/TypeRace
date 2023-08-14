// React
import React from 'react';

// Custom styles
import './Input.css';

export default function InputWrapper({foregroundText, callback, inputRef, backgroundText}) {
    return (
        <div className="inputContainer">
            <textarea
                className="input"
                ref={inputRef}
                spellCheck={false}
                value={foregroundText}
                onChange={(event) => callback(event.target.value)}
            />
            <textarea
                className="inputBackdrop"
                value={backgroundText}
                readOnly
            />
        </div>
    );
};