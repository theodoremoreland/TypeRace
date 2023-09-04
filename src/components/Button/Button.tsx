// React
import React from 'react';

// Custom styles
import './Button.css';

export default function ButtonWrapper({text, callback}) {

    return (
        <button
            key={text}
            className="button"
            onClick={() => callback(text)}
        >
            {text}
        </button>
    );
};