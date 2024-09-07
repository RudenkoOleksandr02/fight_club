import React from 'react';
import classes from './AbsenceBlock.module.css';
import {ReactComponent as IcoAbsence} from './../../../../assets/images/ico_absence.svg'

const AbsenceBlock = ({title = '', text = ''}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
            <div className={classes.inner}>
                <IcoAbsence/>
            </div>
        </div>
    );
};

export default AbsenceBlock;