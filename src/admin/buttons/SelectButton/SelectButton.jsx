import React from 'react';
import classes from './SelectButton.module.css';
import {ReactComponent as IcoArrow} from './../../images/icoArrow.svg';
import useMouseOutsideForBtns from "../../../common/hooks/useMouseOutsideForBtns";

const SelectButton = ({
                          setIsOpenModal,
                          isOpenModal,
                          content,
                          title,
                          modificationStyle = {
                              outlined: true,
                              fontSizeBtn: '16px',
                              fontWeightBtn: '500'
                          }
                      }) => {
    const wrapperRef = useMouseOutsideForBtns(setIsOpenModal);

    return (
        <div className={classes.wrapper} ref={wrapperRef}>
            <button onClick={() => setIsOpenModal(!isOpenModal)}
                    className={`${classes.button} 
                        ${isOpenModal ? classes.isOpen : ''} 
                        ${modificationStyle.outlined ? classes.outlined : ''}
                    `}
                    style={{
                        border: `${modificationStyle.outlined ? '1px solid #4E765C' : 'none'}`,
                        padding: `${modificationStyle.outlined ? '0 17px' : '0'}`,
                        fontSize: modificationStyle.fontSizeBtn,
                        fontWeight: modificationStyle.fontWeightBtn
                    }}
            >
                <span>{title}</span>
                <span className={`${classes.arrow} ${isOpenModal ? classes.rotated : ''}`}><IcoArrow/></span>
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
