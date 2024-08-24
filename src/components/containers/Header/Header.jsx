import React from 'react';
import classes from './Header.module.css';
import {Link, useNavigate} from "react-router-dom";
import User from "../User/User";
import {ReactComponent as IcoCart} from "../../../assets/images/header/ico_cart.svg";
import {useSelector} from "react-redux";

const Header = ({openLoginPanel, setOpenLoginPanel}) => {
    const productsInCart = useSelector(state => state.cartPage.productsInCart);

    const navigate = useNavigate();

    const handleClickCart = () => {
        if (productsInCart.length !== 0) {
            navigate('/cart')
        } else {
            return false
        }
    }

    const productsQuantity = productsInCart.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

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
                            <Link to='/contacts'>Контакти</Link>
                            <Link to='/about'>О нас</Link>
                        </div>
                    </div>
                    <div className={classes.basket}>
                        <div className={`${classes.icoBasket} ${productsInCart.length !== 0 ? classes.pointer : ''}`}
                             onClick={handleClickCart}>
                            {productsInCart.length !== 0 && (
                                <span className={classes.count}>{productsQuantity}</span>
                            )}
                            <IcoCart/>
                        </div>
                    </div>
                    <User openLoginPanel={openLoginPanel} setOpenLoginPanel={setOpenLoginPanel}/>
                </div>
            </div>
        </header>
    );
};

export default Header;