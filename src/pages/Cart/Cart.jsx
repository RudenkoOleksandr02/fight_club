import React, {useEffect} from 'react';
import classes from './Cart.module.css';
import { putProductInCart, removeProductFromCart, deleteProductFromCart } from '../../store/forGuest/cartForGuestSlice';
import {useDispatch, useSelector} from "react-redux";
import ProductsInCart from "./ProductsInCart/ProductsInCart";
import TopPanel from "../../containers/Order/TopPanel/TopPanel";
import {useNavigate} from "react-router-dom";
import InformationPanel from "../../containers/Order/InformationPanel/InformationPanel";
import {
    addProduct,
    changeProductAmount,
    getUserShoppingCart,
    removeProduct
} from "../../store/forUser/cartForUserSlice";

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    /*const productsInCart = useSelector(state => {
        if (user === null) {
            return state.cartForGuest.productsInCart;
        } else {
            return state.cartForUser.productsInCart;
        }
    });*/

    /*useEffect(() => {
        if (user !== null) {
            dispatch(getUserShoppingCart())
        }
    }, [productsInCart]);*/

    const productsInCart = useSelector(state => state.cartForGuest.productsInCart)

    const handleAddToCart = (product) => {
        /*if (user === null) {
            dispatch(putProductInCart(product));
        } else {
            dispatch(addProduct(product.id))
        }*/

        dispatch(putProductInCart(product));
    };

    const handleRemoveFromCart = (productId, quantity) => {
        /*if (user === null) {
            dispatch(removeProductFromCart(productId));
        } else {
            dispatch(changeProductAmount({productId, quantity}));
        }*/

        dispatch(removeProductFromCart(productId));
    };

    const handleDeleteFromCart = (productId) => {
        /*if (user === null) {
            dispatch(deleteProductFromCart(productId));
        } else {
            dispatch(removeProduct(productId));
        }*/

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