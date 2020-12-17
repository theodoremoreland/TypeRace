// React
import React from 'react';

// Semantic UI
import { Input } from 'semantic-ui-react';

// Custom styles
import './Input.css';

export default function InputWrapper({text, callback}) {

    return (
        <Input
            className="input"
            fluid
            value={text}
            onChange={(event) => callback(event.target.value)}
        />

    );
};