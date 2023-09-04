// React
import React from 'react';

// Custom styles
import './Card.css';

export default function CardWrapper({text, callback}) {

    return (
        <div
            className="card"
            key={text}
            onClick={() => callback(text)}
        >
            <p className="cardText">
                {text}
            </p>
        </div>
    );
};