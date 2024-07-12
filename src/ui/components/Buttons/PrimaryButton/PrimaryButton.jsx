import React from 'react';
import classes from './PrimaryButton.module.css'

const PrimaryButton = ({children, disabled = false, onClick}) => {
    return (
        <button className={classes.button} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default PrimaryButton;