import React from 'react';
import classes from './TertiaryButton.module.css';
import {ReactComponent as IcoRow} from '../../../../assets/images/arrows/ico_arrow3.svg'

const TertiaryButton = ({children}) => {
    return (
        <button className={classes.button}>
            <span>{children}</span>
            <IcoRow/>
        </button>
    );
};

export default TertiaryButton;