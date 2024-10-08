import React, { useState, useRef, useEffect } from 'react';
import classes from './ShowMoreBlock.module.css';
import {ReactComponent as IcoBird} from "../../../../assets/images/arrows/ico_arrow3.svg";

const ShowMoreBlock = ({ title, children }) => {
    const [showMore, setShowMore] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (showMore) {
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        } else {
            contentRef.current.style.maxHeight = '210px';
            contentRef.current.style.paddingBottom = '45px'
        }
    }, [showMore]);

    return (
        <div className={`${classes.wrapper} ${showMore ? classes.showMore : ''}`} ref={contentRef}>
            <h3>{title}</h3>
            <div>
                {children}
            </div>
            <button onClick={() => setShowMore(!showMore)}>
                Показати повністю
                <div className={`${classes.ico} ${showMore ? classes.showMore : ''}`}>
                    <IcoBird/>
                </div>
            </button>
        </div>
    );
};

export default ShowMoreBlock;
