import React from 'react';
import classes from './DieBlock.module.css'
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as IcoPlus} from './../images/icoPlus.svg'

const DieBlock = ({title, children, titleForBtn = '', withoutButton = false, handleClick = () => {}}) => {
    return (
        <div className={classes.wrapper}>
            <span>{title}</span>
            <div className={classes.inner}>
                {!withoutButton && (
                    <div className={classes.btn}>
                        <PrimaryButton handleClick={handleClick}>{titleForBtn} <IcoPlus/></PrimaryButton>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default DieBlock;