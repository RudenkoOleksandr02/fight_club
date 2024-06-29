import React from 'react';
import classes from './ButtonWithIcoRow.module.css'
import {ReactComponent as IcoRow} from "./../../../../assets/images/ico_row.svg";

const ButtonWithIcoRow = ({children}) => {
    return (
        <button className={classes.button}>
            <span>{children}</span>
            <IcoRow/>
        </button>
    );
};

export default ButtonWithIcoRow;