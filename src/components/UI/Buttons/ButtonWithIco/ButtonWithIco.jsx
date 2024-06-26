import React from 'react';
import classes from './ButtonWithIco.module.css'

const ButtonWithIco = ({children, icon}) => {
    return (
        <button className={classes.button}>
            <span>{children}</span>
            <img src={icon} alt="icon" />
        </button>
    );
};

export default ButtonWithIco;