import React, { useState, useEffect, useRef } from 'react';
import classes from './TertiaryButton.module.css';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as IcoRow } from '../../../../assets/images/arrows/ico_arrow3.svg';

const TertiaryButton = ({ children, onChange, params }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(children);
    const wrapperRef = useRef(null);

    const handleClick = () => {
        setOpen(value => !value);
    };

    const handleChange = (param) => {
        setName(param.name);
        onChange(param.value);
        setOpen(false);
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open]);

    return (
        <div className={classes.wrapper} ref={wrapperRef}>
            <button className={classes.button} onClick={handleClick}>
                <span>{name}</span>
                <div className={open ? `${classes.icoArrowWrapper} ${classes.roll}` : classes.icoArrowWrapper}>
                    <IcoRow />
                </div>
            </button>
            {open && (
                <div className={classes.sortByWrapper}>
                    {params.map((param) => (
                        <div onClick={() => handleChange(param)} key={uuidv4()}>
                            {param.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TertiaryButton;
