import React from 'react';
import classes from './Popup.module.css';
import useBodyOverflowHidden from "../../../common/hooks/useBodyOverflowHidden";

const Popup = ({children, onClose = () => {}, closeBtn = false}) => {
    useBodyOverflowHidden(true);

    return (
        <div className={classes.wrapper} onClick={onClose}>
            {closeBtn && <button className={classes.close} onClick={onClose}>
                <span></span>
                <span></span>
            </button>}
            <div className={classes.inner} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Popup;