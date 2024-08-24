import React from 'react';
import classes from "./Inputs.module.css";

const TextAreaAdmin = ({placeholder, value, onChange}) => {
    return (
        <div className={classes.inputWrapp}>
            <span className={classes.placeholder}>{placeholder}</span>
            <textarea value={value} onChange={onChange}/>
        </div>
    );
};

export default TextAreaAdmin;