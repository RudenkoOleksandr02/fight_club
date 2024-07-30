import React from 'react';
import classes from './Header.module.css';
import {Link, useNavigate} from "react-router-dom";
import User from "../../../containers/User/User";
import {ReactComponent as IcoCart} from "../../../assets/images/header/ico_cart.svg";
import {useSelector} from "react-redux";

const Header = ({openLoginPanel, setOpenLoginPanel}) => {
    const user = useSelector(state => state.auth.user);
    /*const productsInCart = useSelector(state => {
        if (user === null) {
            return state.cartForGuest.productsInCart;
        } else {
            return true
        }
    });*/
    const navigate = useNavigate();
    const productsInCart = useSelector(state => state.cartForGuest.productsInCart);

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
                        <div className={`${classes.icoBasket} ${productsInCart.length !== 0 ? classes.pointer : ''}`} onClick={handleClickCart}>
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