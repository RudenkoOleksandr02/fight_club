import React from 'react';
import classes from './SecondaryButton.module.css'
import {ReactComponent as IcoRow} from "../../../../assets/images/ico_arrow2.svg";

const SecondaryButton = ({children}) => {
    return (
        <button className={classes.button}>
            <span>{children}</span>
            <IcoRow/>
        </button>
    );
};

export default SecondaryButton;