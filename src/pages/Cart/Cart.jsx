import React from 'react';
import classes from './Cart.module.css';
import { putProductInCart, removeProductFromCart, deleteProductFromCart, selectTotalPrice } from '../../store/cartSlice';
import {useDispatch, useSelector} from "react-redux";
import ProductsInCart from "./ProductsInCart/ProductsInCart";
import TopPanel from "../../containers/Order/TopPanel/TopPanel";

const Cart = () => {
    const dispatch = useDispatch();
    const productsInCart = useSelector(state => state.cart.productsInCart);
    const totalPrice = useSelector(selectTotalPrice);

    const handleAddToCart = (product) => {
        dispatch(putProductInCart(product));
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeProductFromCart(productId));
    };

    const handleDeleteFromCart = (productId) => {
        dispatch(deleteProductFromCart(productId));
    };

    return (
        <div className={classes.wrapper}>
            <TopPanel path='/cart'/>
            <ProductsInCart
                productsInCart={productsInCart}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDeleteFromCart={handleDeleteFromCart}
            />
        </div>
    );
};

export default Cart;