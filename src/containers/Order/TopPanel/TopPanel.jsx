import React from 'react';
import classes from './TopPanel.module.css'
import {useNavigate} from "react-router-dom";

const TopPanel = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.cart} ${navigate() === '/cart' ? classes.active : ''}`}>
                <span>Кошик</span>
                <div className={classes.line}></div>
            </div>
            <div className={`${classes.checkout} ${navigate() === '/checkout' ? classes.active : ''}`}>
                <span>Оформлення</span>
                <div className={classes.line}></div>
            </div>
        </div>
    );
};

export default TopPanel;