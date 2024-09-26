import React from 'react';
import classes from "./FormSelect.module.css";
import {ReactComponent as IcoArrow} from "../../../../assets/images/arrows/ico_arrow1.svg";

const FormSelect = (props) => {
    const {
        type,
        text,
        color,
        value,
        onChange,
        handleSend = () => {},
        error = '',
        success = ''
    } = props;

    const setColor = () => {
        if (color === 'primary') {
            return 'rgba(249, 249, 249, 1)';
        } else if (color === 'secondary') {
            return 'rgba(78, 118, 92, 1)';
        }
    }

    return <>
        {error !== '' && <p className={classes.error}>{error}</p>}
        {success !== '' && <p className={classes.success}>{success}</p>}
        <form
            className={`
                ${classes.form} 
                ${error !== '' ? classes.error : ''}
                ${success !== '' ? classes.success : ''}
            `}
            onSubmit={e => e.preventDefault()}
        >
            <input
                type={type}
                placeholder={text}
                style={{
                    border: `1px solid ${setColor()}`,
                    borderRight: 'none'
                }}
                value={value}
                onChange={onChange}
            />
            <button onClick={handleSend} style={{
                background: setColor()
            }}>
                <IcoArrow/>
            </button>
        </form>
    </>;
};

export default FormSelect;