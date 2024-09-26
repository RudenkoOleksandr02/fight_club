import React, { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import classes from "./Input.module.css";

const InputMobile = ({
                         placeholder = 'Телефон',
                         handleChangePhoneNumber,
                         errors = [],
                         value = ''
                     }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleValueChange = (values) => {
        const { value } = values;
        handleChangePhoneNumber('+38' + value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={classes.wrapper}>
            {errors.length > 0 && (
                <div className={classes.errorWrapper}>
                    {errors.map((error, index) => (
                        <p className={classes.error} key={index}>
                            {error}
                        </p>
                    ))}
                </div>
            )}
            <PatternFormat
                format="+38 (###) ### ## ##"
                mask="_"
                value={value.replace(/^\+38/, '')}
                onValueChange={handleValueChange}
                allowEmptyFormatting={isFocused}
                className={`${classes.input} ${errors.length !== 0 ? classes.errorInput : ''}`}
                type="tel"
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default InputMobile;
