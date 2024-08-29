import React from 'react';
import classes from "./Checkbox.module.css";
import {ReactComponent as IcoCheck} from "./check.svg";

const Checkbox = ({
                      disabled = false,
                      onChange = () => {},
                      checked = false,
                      style = 'primary',
                      text = ''
                  }) => {
    const uniqueId = `checkbox-${Math.random().toString(36).slice(2, 11)}`;
    return (
        <>
            <input
                type="checkbox"
                disabled={disabled}
                onChange={onChange}
                checked={checked}
                className={classes.checkboxInput}
                id={uniqueId}
            />
            <div className={classes.wrapper}>
                <label className={`
                    ${classes.customCheckbox} 
                    ${style === 'primary' ? classes.primary : ''}
                    ${disabled ? classes.disabled : ''}
                `} htmlFor={uniqueId}>
                    {checked ? <IcoCheck/> : null}
                </label>
                {!!text ? <label className={`
                    ${classes.text} 
                    ${style === 'primary' ? classes.primary : ''}
                    ${disabled ? classes.disabled : ''}
                `} htmlFor={uniqueId}>{text}</label> : null}
            </div>
        </>
    );
};

export default Checkbox;