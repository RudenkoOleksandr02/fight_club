import React from 'react';
import classes from './Header.module.css';
import {Link, useNavigate} from "react-router-dom";
import User from "../User/User";
import {ReactComponent as IcoCart} from "../../../assets/images/header/ico_cart.svg";
import {useSelector} from "react-redux";

const Header = () => {
    const productsInCart = useSelector(state => state.cart.productsInCart);
    const navigate = useNavigate();

    const handleClickCart = () => {
        if (productsInCart.length !== 0) {
            navigate('/cart')
        } else {
            return false
        }
    }

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
                        <div className={`${classes.icoBasket} ${productsInCart.length !== 0 ? classes.pointer : ''}`} onClick={handleClickCart}>
                            <IcoCart/>
                        </div>
                    </div>
                    <User/>
                </div>
            </div>
        </header>
    );
};

export default Header;