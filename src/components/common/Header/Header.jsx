import React from 'react';
import classes from './Header.module.css';
import ico_basket from '../../../assets/images/ico_basket.png';
import {Link} from "react-router-dom";
import User from "../User/User";

const Header = () => {
    return (
        <header>
            <div className={classes.wrapper}>
                <h1 className={classes.logo}>BLOSSOM</h1>
                <div className={classes.mainContainer}>
                    <div className={classes.navigate}>
                        <div className={classes.links}>
                            <Link to='/blog'>Блог</Link>
                            <Link to='/brands'>Бренды</Link>
                            <Link to='/about'>О нас</Link>
                        </div>
                        <div className={classes.basket}>
                            <div className={classes.sum}>
                                200₴
                            </div>
                            <div className={classes.icoBasket}>
                                <img src={ico_basket} alt='busket'/>
                            </div>
                        </div>
                    </div>
                    <User/>
                </div>
            </div>
        </header>
    );
};

export default Header;