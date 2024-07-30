import React from 'react';
import classes from "./FormSelect.module.css";
import {ReactComponent as IcoArrow} from "../../../assets/images/arrows/ico_arrow1.svg";

const FormSelect = ({type, text, color, value, onChange, handleSend = () => {}}) => {
    const setColor = () => {
        if (color === 'primary') {
            return 'rgba(249, 249, 249, 1)';
        } else if (color === 'secondary') {
            return 'rgba(78, 118, 92, 1)';
        }
    }

    return (
        <form className={classes.form} onSubmit={e => e.preventDefault()}>
            <input
                type={type}
                placeholder={text}
                style={{
                    border: `1px solid ${setColor()}`,
                    color: setColor()
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
    );
};

export default FormSelect;