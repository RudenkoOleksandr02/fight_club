import React from 'react';
import classes from './Input.module.css'

const Input = ({type, placeholder, value, onChange, errors, disabled = false}) => {
    return (
        <div className={classes.wrapper}>
            {errors.map((error, index) => {
                return <p className={classes.error} key={index}>
                    {error}
                </p>
            })}
            <input
                className={`${classes.input} ${errors.length !== 0 ? classes.errorInput : ''}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};

export default Input;