import React from 'react';
import classes from './NoImageBlock.module.css';
import {ReactComponent as IcoAbsence} from './../../../../assets/images/ico_absence.svg';

const NoImageBlock = () => {
    return (
        <div className={classes.wrapper}>
            <IcoAbsence/>
        </div>
    );
};

export default NoImageBlock;