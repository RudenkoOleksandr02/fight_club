import React from 'react';
import classes from './Input.module.css'

const Input = ({type, placeholder, value, onChange, errors}) => {
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
            />
        </div>
    );
};

export default Input;