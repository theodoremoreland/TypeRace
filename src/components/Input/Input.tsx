// React
import React from 'react';

// Custom styles
import './Input.css';

interface Props {
    foregroundText: string;
    callback: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    inputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
    backgroundText: string;
}

export default function InputWrapper({ foregroundText, callback, inputRef, backgroundText }: Props) {
    return (
        <div className="inputContainer">
            <textarea
                className="input"
                ref={inputRef}
                spellCheck={false}
                value={foregroundText}
                onChange={callback}
            />
            <textarea
                className="inputBackdrop"
                value={backgroundText}
                readOnly
            />
        </div>
    );
};