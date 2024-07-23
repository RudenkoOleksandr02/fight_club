import React, {useEffect} from 'react';
import classes from './Cart.module.css';
import { putProductInCart, removeProductFromCart, deleteProductFromCart } from '../../store/cartSlice';
import {useDispatch, useSelector} from "react-redux";
import ProductsInCart from "./ProductsInCart/ProductsInCart";
import TopPanel from "../../containers/Order/TopPanel/TopPanel";
import {useNavigate} from "react-router-dom";
import InformationPanel from "../../containers/Order/InformationPanel/InformationPanel";

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const productsInCart = useSelector(state => state.cart.productsInCart);

    const handleAddToCart = (product) => {
        dispatch(putProductInCart(product));
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeProductFromCart(productId));
    };

    const handleDeleteFromCart = (productId) => {
        dispatch(deleteProductFromCart(productId));
    };

    useEffect(() => {
        if (productsInCart.length === 0) {
            navigate('/')
        }
    }, [productsInCart.length]);


    return (
        <div className={classes.wrapper}>
            <div className={classes.topPanel}>
                <TopPanel path='/cart'/>
            </div>
            <div className={classes.productsInCart}>
                <ProductsInCart
                    productsInCart={productsInCart}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleDeleteFromCart={handleDeleteFromCart}
                />
            </div>
            <div className={classes.informationPanel}>
                <InformationPanel
                    orderParams={{text: 'Оформити замовлення', handleClick: () => navigate('/checkout')}}
                />
            </div>
        </div>
    );
};

export default Cart;