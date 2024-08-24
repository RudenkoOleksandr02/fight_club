import React from 'react';
import classes from './PopupAdmin.module.css';
import Popup from "../../components/ui/Popup/Popup";

const PopupAdmin = ({children}) => {
    return (
        <div className={classes.popupFix}>
            <Popup>{children}</Popup>
        </div>
    );
};

export default PopupAdmin;