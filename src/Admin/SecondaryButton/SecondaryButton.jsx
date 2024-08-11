import React from 'react';
import classes from './SecondaryButton.module.css'

const SecondaryButton = ({children, handleClick}) => {
    return (
        <button className={classes.button} onClick={handleClick}>
            {children}
        </button>
    );
};

export default SecondaryButton;