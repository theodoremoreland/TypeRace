// React
import React from 'react';

// Custom styles
import './Snippet.css';

export default function Snippet({snippet}) {

    return (
        <>
            <h3 className="header">Snippet</h3>
            <div className="snippet">
                {snippet}
            </div>
        </>
    );
};