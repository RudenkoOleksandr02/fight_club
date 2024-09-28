import React from 'react';
import Popup from "../../components/ui/Popup/Popup";
import classes from './PopupForDelete.module.css'

const PopupForDelete = ({message = '', onDelete = () => {}, onCancel = () => {}}) => {
    return (
        <Popup>
            <div className={classes.wrapper}>
                <h3>{message}</h3>
                <button onClick={onDelete}>Видалити</button>
                <button onClick={onCancel}>Скасування</button>
            </div>
        </Popup>
    );
};

export default PopupForDelete;