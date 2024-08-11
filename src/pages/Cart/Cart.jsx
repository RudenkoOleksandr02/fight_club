import React, {useEffect} from 'react';
import classes from './Cart.module.css';
import {useDispatch, useSelector} from "react-redux";
import ProductsInCart from "./ProductsInCart/ProductsInCart";
import TopPanel from "../../containers/Order/TopPanel/TopPanel";
import {useNavigate} from "react-router-dom";
import InformationPanel from "../../containers/Order/InformationPanel/InformationPanel";
import {
    addProduct, changeProductAmount,
    getUserShoppingCart, removeProduct,

} from "../../store/cartSlice";

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const productsInCart = useSelector(state => state.cart.productsInCart)
    const loading = useSelector(state => state.cart.loading);
    const isAuth = useSelector(state => state.auth.isAuth)

    useEffect(() => {
        if (isAuth) {
            dispatch(getUserShoppingCart())
        }
    }, [isAuth]);

    const handleAddToCart = (product) => {
        dispatch(addProduct(product))
    };

    const handleChangeProductsInCart = (productId, quantity) => {
        dispatch(changeProductAmount({productId, quantity}));
    };

    const handleDeleteFromCart = (productId) => {
        dispatch(removeProduct(productId));
    };

    useEffect(() => {
        if (!loading && productsInCart.length === 0) {
            navigate('/')
        }
    }, [productsInCart.length, loading]);


    return (
        <div className={classes.wrapper}>
            <div className={classes.topPanel}>
                <TopPanel path='/cart'/>
            </div>
            <div className={classes.productsInCart}>
                <ProductsInCart
                    productsInCart={productsInCart}
                    handleAddToCart={handleAddToCart}
                    handleChangeProductsInCart={handleChangeProductsInCart}
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