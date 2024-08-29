import React from 'react';
import classes from './ToggleButton.module.css';

const ToggleButton = ({text, handleClick, rotated, isShowArrow}) => {
    return (
        <button className={classes.toggleBtn} onClick={handleClick}>
            <span>{text}</span>
            <div className={`
                ${classes.arrow} 
                ${isShowArrow ? classes.isShowArrow : ''}
                ${rotated ? classes.rotated : ''}
            `}>
                <span className={classes.line}></span>
                <span className={classes.line}></span>
            </div>
        </button>
    );
};

export default ToggleButton;