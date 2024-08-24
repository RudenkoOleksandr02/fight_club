import React from 'react';
import classes from './Modal.module.css';

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={classes.modal} onClick={onClose}>
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
