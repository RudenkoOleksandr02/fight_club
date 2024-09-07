import React from 'react';
import classes from './ButtonWithModal.module.css'
import useMouseOutsideForBtns from "../../../common/hooks/useMouseOutsideForBtns";

const ButtonWithModal = ({
                             button,
                             contentForModal,
                             isOpenModal,
                             setIsOpenModal,
                         }) => {
    const contentRef = useMouseOutsideForBtns(setIsOpenModal)

    return (
        <div className={classes.wrapper} ref={contentRef}>
            <div className={classes.button}>{button}</div>
            <div className={`${classes.modal} ${isOpenModal ? classes.isOpen : ''}`}>{contentForModal}</div>
        </div>
    );
};

export default ButtonWithModal;