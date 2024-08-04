import React from 'react';
import classes from './Popup.module.css';

const Popup = ({children, onClose = () => {}}) => {
    return (
        <div className={classes.wrapper} onClick={onClose}>
            <div className={classes.inner} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Popup;