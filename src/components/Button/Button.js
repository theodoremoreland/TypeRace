// React
import React from 'react';

// Semantic UI
import { Button } from 'semantic-ui-react';

// Custom styles
import './Button.css';

export default function ButtonWrapper({text, callback}) {

    return (
        <Button
            key={text}
            className="button"
            onClick={() => callback(text)}
        >
            {text}
        </Button>
    );
};