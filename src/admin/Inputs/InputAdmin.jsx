import React from 'react';
import Input from "../../components/ui/inputs/Input/Input";
import classes from './Inputs.module.css';

const InputAdmin = ({value, placeholder, type = 'text', onChange = () => {}, errors = [], disabled = false}) => {
    return (
        <div className={classes.inputWrapp}>
            <span className={classes.placeholder}>{placeholder}</span>
            <Input onChange={onChange} errors={errors} type={type} placeholder='' value={value} disabled={disabled}/>
        </div>
    );
};

export default InputAdmin;