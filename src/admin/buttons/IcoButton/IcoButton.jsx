import React from 'react';
import classes from './IcoButton.module.css'

const IcoButton = ({svgIco, onClick = () => {}}) => {
    return (
        <button className={classes.button} onClick={onClick}>
            {svgIco}
        </button>
    );
};

export default IcoButton;