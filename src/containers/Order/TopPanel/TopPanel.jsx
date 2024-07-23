import React from 'react';
import classes from './TopPanel.module.css';
import {useLocation, useNavigate} from 'react-router-dom';

const TopPanel = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={classes.wrapper}>
            <div
                onClick={() => navigate('/cart')}
                className={`${classes.cart} ${location.pathname === '/cart' ? classes.active : ''}`}
            >
                <span>Кошик</span>
                <div className={classes.line}></div>
            </div>
            <div
                onClick={() => navigate('/checkout')}
                className={`${classes.checkout} ${location.pathname === '/checkout' ? classes.active : ''}`}
            >
                <span>Оформлення</span>
                <div className={classes.line}></div>
            </div>
        </div>
    );
};

export default TopPanel;
