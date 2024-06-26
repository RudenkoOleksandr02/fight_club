import React from 'react';
import classes from './IcoButton.module.css';

const IcoButton = ({icon}) => {
    return (
        <button className={classes.icoBtn}>
            {icon}
        </button>
    );
};

export default IcoButton;