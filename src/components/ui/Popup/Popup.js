import React from 'react';
import classes from './Popup.module.css';
import useBodyOverflowHidden from "../../../common/hooks/useBodyOverflowHidden/useBodyOverflowHidden";

const Popup = ({children, onClose = () => {}}) => {
    useBodyOverflowHidden(true);

    return (
        <div className={classes.wrapper} onClick={onClose}>
            <div className={classes.inner} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Popup;