import React from 'react';
import classes from "./CloseBtn.module.css";

const CloseBtn = ({setIsOpen, styles: {width1, width2, color, height}}) => {
    return (
        <button className={classes.close} onClick={setIsOpen} style={{width: width1, height}}>
            <div className={classes.item} style={{width: width2, background: color}}></div>
            <div className={classes.item} style={{width: width2, background: color}}></div>
        </button>
    );
};

export default CloseBtn;