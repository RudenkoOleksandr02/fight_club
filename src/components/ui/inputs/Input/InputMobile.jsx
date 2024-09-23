import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import classes from "./Input.module.css";

const InputMobile = ({
                         placeholder = 'Телефон',
                         handleSetPhoneInUserInfo,
                         errors = [],
                         value = ''
                     }) => {
    const [phone, setPhone] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (value) {
            const digits = value.replace(/\D/g, '');

            let formatted = '';

            if (digits.startsWith('38')) {
                formatted = `+38 (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
            } else if (digits.startsWith('0')) {
                formatted = `+38 (${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
            } else {
                formatted = '+38 (___) ___ __ __';
            }

            setPhone(formatted);
        } else {
            setPhone('');
        }
    }, [value]);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setPhone(inputValue);

        const digits = inputValue.replace(/\D/g, '');

        if (digits.startsWith('38')) {
            handleSetPhoneInUserInfo(digits);
        } else if (digits.startsWith('0')) {
            handleSetPhoneInUserInfo(`38${digits.slice(1)}`);
        } else {
            handleSetPhoneInUserInfo('');
        }
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
            <InputMask
                mask="+38 (999) 999 99 99"
                value={phone}
                onChange={handleChange}
                maskChar={isFocused || phone ? '_' : null}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                {(inputProps) => (
                    <input
                        {...inputProps}
                        id="phoneNumber"
                        className={`${classes.input} ${errors.length !== 0 ? classes.errorInput : ''}`}
                        type="tel"
                        placeholder={placeholder}
                        required
                    />
                )}
            </InputMask>
        </div>
    );
};

export default InputMobile;
