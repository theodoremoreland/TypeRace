import React from 'react';

const Button = (props) => {
    return <button onClick={props.onClick}>{props.buttonText}</button>
}

export default Button;
