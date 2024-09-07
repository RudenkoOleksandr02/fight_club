import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classes from './Folding.module.css';
import { ReactComponent as IcoArrow } from "./../../../../assets/images/arrows/ico_arrow3.svg";

const Folding = ({
                     handleClick = () => {},
                     contentBtn,
                     contentDropdown,
                     isOpen,
                     modificationStyleBtn = {
                         color: 'primary',
                         fontSize: '18px',
                         fontWeight: '400'
                     }
                 }) => {
    const contentRef = useRef(null);

    const calculateHeight = () => {
        if (contentRef.current) {
            return contentRef.current.scrollHeight;
        }
        return 0;
    };

    return (
        <div className={`${classes.wrapper} ${modificationStyleBtn.color !== 'primary' ? classes.modificationColor : ''}`}>
            <button
                style={{ fontSize: modificationStyleBtn.fontSize, fontWeight: modificationStyleBtn.fontWeight }}
                onClick={handleClick}
                className={classes.button}
            >
                <div className={classes.contentBtn}>
                    <div className={classes.contentBtn}>{contentBtn}</div>
                    <div className={`${classes.arrow} ${isOpen ? classes.isOpen : ''}`}>
                        <IcoArrow />
                    </div>
                </div>
            </button>
            <CSSTransition
                in={isOpen}
                timeout={200}
                classNames={{
                    enter: classes.dropdownAnimationEnter,
                    enterActive: classes.dropdownAnimationEnterActive,
                    exit: classes.dropdownAnimationExit,
                    exitActive: classes.dropdownAnimationExitActive,
                }}
                nodeRef={contentRef}
                onEnter={() => {
                    contentRef.current.style.height = '0px';
                }}
                onEntering={() => {
                    contentRef.current.style.height = `${calculateHeight()}px`;
                }}
                onEntered={() => {
                    contentRef.current.style.height = 'auto';
                }}
                onExit={() => {
                    contentRef.current.style.height = `${calculateHeight()}px`;
                }}
                onExiting={() => {
                    contentRef.current.style.height = '0px';
                }}
                unmountOnExit
            >
                <div
                    ref={contentRef}
                    className={`${classes.dropdown}`}
                    style={{ overflow: 'hidden' }}
                >
                    {contentDropdown}
                </div>
            </CSSTransition>
        </div>
    );
};

export default Folding;
