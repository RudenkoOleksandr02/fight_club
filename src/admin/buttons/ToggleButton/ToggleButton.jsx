import React from 'react';
import classes from './ToggleButton.module.css';
import {ReactComponent as IcoArrow} from './../../images/icoArrow.svg'

const ToggleButton = ({text, handleClick, rotated, isShowArrow}) => {
    return (
        <button className={classes.toggleBtn} onClick={handleClick}>
            <span>{text}</span>
            {isShowArrow ? (<span className={`${classes.arrow} ${rotated ? classes.rotated : ''}`}>
                <IcoArrow/>
            </span>) : (
                <span className={classes.line}></span>
            )}
        </button>
    );
};

export default ToggleButton;