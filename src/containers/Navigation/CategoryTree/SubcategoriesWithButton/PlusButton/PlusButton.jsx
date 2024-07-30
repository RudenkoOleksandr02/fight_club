import React from 'react';
import classes from "./PlusButton.module.css";

const PlusButton = ({ handleClick, isOpen }) => {
    return (
        <button onClick={handleClick} className={classes.showMore}>
            <span className={`${classes.verticalLine} ${isOpen ? classes.rotated : ''}`}></span>
            <span className={classes.horizontalLine}></span>
        </button>
    );
};

export default PlusButton;
