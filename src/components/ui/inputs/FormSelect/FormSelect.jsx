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
        success = '',
        disabled = false
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
                    borderRight: 'none',
                    color: `${color === 'primary' ? '#F9F9F9' : '#2B2B2B'}`,
                    fontSize: disabled ? '16px' : '20px'
                }}
                value={`${disabled ? 'Тимчасово не працює' : value}`}
                onChange={onChange}
                disabled={disabled}
            />
            <button onClick={handleSend} disabled={disabled} style={{
                background: setColor()
            }}>
                <IcoArrow/>
            </button>
        </form>
    </>;
};

export default FormSelect;