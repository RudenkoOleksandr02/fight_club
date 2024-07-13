import React from 'react';
import classes from './SecondaryButton.module.css'
import {ReactComponent as IcoRow} from "../../../../assets/images/arrows/ico_arrow2.svg";

const SecondaryButton = ({children, handleClick}) => {
    return (
        <button className={classes.button} onClick={handleClick}>
            <span>{children}</span>
            <IcoRow/>
        </button>
    );
};

export default SecondaryButton;