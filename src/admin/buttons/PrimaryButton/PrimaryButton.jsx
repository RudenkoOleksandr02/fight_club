import React from 'react';
import classes from './PrimaryButton.module.css';

const PrimaryButton = ({children, handleClick, isOpen, disabled = false}) => {
    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={`${classes.button} ${isOpen ? classes.isOpen : ''}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;