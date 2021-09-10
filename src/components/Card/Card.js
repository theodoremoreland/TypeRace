// React
import React from 'react';

// Semantic UI
import { Card } from 'semantic-ui-react';

// Custom styles
import './Card.css';

export default function CardWrapper({text, callback}) {

    return (
        <Card
            header={text}
            className="card"
            key={text}
            onClick={() => callback(text)}
        />
    );
};