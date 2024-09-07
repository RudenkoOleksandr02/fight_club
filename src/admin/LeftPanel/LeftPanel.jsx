import React from 'react';
import classes from './LeftPanel.module.css';
import IcoButton from "../buttons/IcoButton/IcoButton";
import {ReactComponent as IcoClose} from "./../images/icoClose.svg";

const LeftPanel = ({children, isOpen, onClose}) => {
    return (
        <div className={`${classes.wrapper} ${isOpen ? classes.isOpen : ''}`}>
            <div className={classes.close}>
                <IcoButton svgIco={<IcoClose/>} onClick={onClose}/>
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};

export default LeftPanel;