import React, {useState} from 'react';
import classes from "./Input.module.css";
import {useMask} from "@react-input/mask";

const InputMobile = ({placeholder = 'Телефон', handleSetPhoneInUserInfo, errors}) => {
    const [mask, setMask] = useState('');

    const inputRef = useMask(
        {
            mask: '+38 (XXX) XXX XX XX',
            replacement: { 'X': /\d/ },
        });
    const handleFocus = () => {
        if (mask.length === 0) {
            setMask('+38');
        }
    }
    const handleBlur = () => {
        if (mask === '+38') {
            setMask('');
        }
    }
    const handleChange = (event) => {
        const value = event.target.value;
        if (value.startsWith('+38')) {
            setMask(value);
            handleSetPhoneInUserInfo(value.replace(/[\s()-]/g, ''));
        } else {
            setMask('+38' + value.replace('+38', ''));
            handleSetPhoneInUserInfo('');
        }
    }

    return (
        <div className={classes.wrapper}>
            {errors.map((error, index) => {
                return <p className={classes.error} key={index}>
                    {error}
                </p>
            })}
            <input
                id='phoneNumber'
                ref={inputRef}
                className={`${classes.input} ${errors.length !== 0 ? classes.errorInput : ''}`}
                type='tel'
                placeholder={placeholder}
                value={mask}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default InputMobile;
