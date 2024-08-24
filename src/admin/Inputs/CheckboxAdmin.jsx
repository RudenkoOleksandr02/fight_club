import React from 'react';
import classes from './Inputs.module.css'; // Импортируем стили как модуль

const CheckboxAdmin = ({ disabled = false, onChange = () => {}, checked = false }) => {
    return (
        <div className={classes.wrappCheckbox}>
            <input
                type="checkbox"
                disabled={disabled}
                onChange={onChange}
                checked={checked}
                className={classes.checkboxInput}
                id='checkbox'
            />
            <label className={classes.customCheckbox} htmlFor='checkbox'/>
        </div>
    );
};

export default CheckboxAdmin;
