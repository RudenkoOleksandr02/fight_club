import React from 'react';
import classes from './Button.module.css'

const Button = ({children, disabled = false}) => {
    return (
        <button className={classes.button} disabled={disabled}>
            {children}

        </button>
    );
};

export default Button;