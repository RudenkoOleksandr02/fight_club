import React from 'react';
import classes from './SecondaryButton.module.css'
import {ReactComponent as IcoArrow} from "../../../../assets/images/arrows/ico_arrow2.svg";

const SecondaryButton = ({children, handleClick, putIcoArrow = false}) => {
    return (
        <button className={classes.button} onClick={handleClick}>
            <span>{children}</span>
            {putIcoArrow && <IcoArrow/>}
        </button>
    );
};

export default SecondaryButton;