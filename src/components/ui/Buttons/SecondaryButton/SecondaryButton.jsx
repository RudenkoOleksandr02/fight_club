import React from 'react';
import classes from './SecondaryButton.module.css';

const SecondaryButton = ({children, handleClick}) => {
    return (
        <button className={classes.button} onClick={handleClick}>
            <span>{children}</span>
        </button>
    );
};

export default SecondaryButton;