import React, { useEffect, useRef } from 'react';
import classes from './SelectButton.module.css';
import { ReactComponent as IcoArrow } from './../../images/icoArrow.svg';

const SelectButton = ({ setIsOpenModal, isOpenModal, content, title }) => {
    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpenModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={classes.wrapper} ref={wrapperRef}>
            <button onClick={() => setIsOpenModal(!isOpenModal)}
                    className={`${classes.button} ${isOpenModal ? classes.isOpen : ''}`}
            >
                <span>{title}</span>
                <span className={`${classes.arrow} ${isOpenModal ? classes.rotated : ''}`}><IcoArrow /></span>
            </button>
            <div className={`${classes.modal} ${isOpenModal ? classes.isOpen : ''}`}>
                <div className={classes.content}>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default SelectButton;
