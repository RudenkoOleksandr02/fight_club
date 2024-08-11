import React from 'react';
import classes from './PrimaryButton.module.css';

const PrimaryButton = ({children, handleClick, isOpen}) => {
    return (
        <button onClick={handleClick} className={`${classes.button} ${isOpen ? classes.isOpen : ''}`}>
            {children}
        </button>
    );
};

export default PrimaryButton;