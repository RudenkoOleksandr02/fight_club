import React from 'react';
import classes from './PrimaryButton.module.css'

const PrimaryButton = ({children, disabled = false}) => {
    return (
        <button className={classes.button} disabled={disabled}>
            {children}

        </button>
    );
};

export default PrimaryButton;