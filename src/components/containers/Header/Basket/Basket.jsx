import React, { useState, useEffect } from 'react';
import classes from './Basket.module.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IcoCart } from './../../../../assets/images/header/ico_cart.svg';

const Basket = () => {
    const productsInCart = useSelector(state => state.cartPage.productsInCart);
    const navigate = useNavigate();

    const handleClickCart = () => {
        if (productsInCart.length !== 0) {
            navigate('/cart');
        } else {
            return false;
        }
    };

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let animationTimeout;
        let pauseTimeout;

        const startAnimation = () => {
            if (!isMounted) return;
            setIsAnimating(true);
            animationTimeout = setTimeout(() => {
                setIsAnimating(false);
                pauseTimeout = setTimeout(() => {
                    startAnimation();
                }, 1000);
            }, 800);
        };

        if (productsInCart.length !== 0) {
            startAnimation();
        } else {
            setIsAnimating(false);
        }

        return () => {
            isMounted = false;
            clearTimeout(animationTimeout);
            clearTimeout(pauseTimeout);
        };
    }, [productsInCart.length]);

    return (
        <div
            className={`
            ${classes.wrapper} 
            ${isAnimating ? classes.animate : ''} 
            ${!productsInCart.length ? classes.disabled : ''}`}
            onClick={handleClickCart}
        >
            <IcoCart />
        </div>
    );
};

export default Basket;