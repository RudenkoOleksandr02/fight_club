import React from 'react';
import classes from './Header.module.css';
import {Link} from "react-router-dom";
import User from "../User/User";
import {ReactComponent as IcoCart} from "../../../assets/images/header/ico_cart.svg";

const Header = () => {
    return (
        <header>
            <div className={classes.wrapper}>
                <h1 className={classes.logo}>
                    <Link to='/'>
                        BLOSSOM
                    </Link>
                </h1>
                <div className={classes.container}>
                    <div className={classes.navigate}>
                        <div className={classes.links}>
                            <Link to='/blog'>Блог</Link>
                            <Link to='/brands'>Бренды</Link>
                            <Link to='/about'>О нас</Link>
                        </div>
                    </div>
                    <div className={classes.basket}>
                        <div className={classes.sum}>
                            200₴
                        </div>
                        <div className={classes.icoBasket}>
                            <Link to='/cart'><IcoCart/></Link>
                        </div>
                    </div>
                    <User/>
                </div>
            </div>
        </header>
    );
};

export default Header;