import React from 'react';
import classes from './TopPanel.module.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {ReactComponent as IcoArrow} from "./../../../../assets/images/arrows/arrow-up.svg";
import {ReactComponent as IcoCart} from './../../../../assets/images/header/ico_cart.svg';

const TopPanel = () => {
    const location = useLocation();
    const navigate = useNavigate()

    return (
        <div className={classes.wrapper}>
            {location.pathname === '/checkout' && (
                <div className={classes.backToCart} onClick={() => navigate('/cart')}>
                    <div><IcoArrow/></div>
                    <div><IcoCart/></div>
                </div>
            )}
            <div className={classes.main}>
                <div className={classes.cart}>
                    <span>Кошик</span>
                    <div className={classes.line}></div>
                </div>
                <div className={`${classes.checkout} ${location.pathname === '/checkout' ? classes.active : ''}`}>
                    <span>Оформлення</span>
                    <div className={classes.line}></div>
                </div>
            </div>
        </div>
    );
};

export default TopPanel;
