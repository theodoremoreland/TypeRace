// React
import React from 'react';

// Semantic UI
import { Card } from 'semantic-ui-react';

// Custom styles
import './Snippet.css';

export default function Snippet({snippet, callback}) {

    return (
        <Card
            header={snippet}
            className="snippetCard"
            onClick={() => callback(snippet)}
        />
    );
};