import React, {useEffect} from 'react';
import classes from './Cart.module.css';
import {useDispatch, useSelector} from "react-redux";
import ProductsInCart from "./ProductsInCart/ProductsInCart";
import {useNavigate} from "react-router-dom";
import TopPanel from "../../components/containers/Order/TopPanel/TopPanel";
import InformationPanel from "../../components/containers/Order/InformationPanel/InformationPanel";
import {
    getUserShoppingCart
} from "../../store/pageSlices/cartPageSlice";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";

const Cart = () => {
    const {productsInCart, loading} = useSelector(state => state.cartPage)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserShoppingCart());
    }, []);

    useEffect(() => {
        if (!loading && productsInCart.length === 0) {
            navigate('/');
        }
    }, [productsInCart.length, loading]);


    return (
        <div className={classes.wrapper}>
            <div className={classes.breadcrumbs}>
                <Breadcrumbs links={[{id: '/cart', name: 'Кошик'}]}/>
            </div>
            <div className={classes.main}>
                <div className={classes.topPanel}>
                    <TopPanel/>
                </div>
                <div className={classes.productsInCart}>
                    <ProductsInCart productsInCart={productsInCart}/>
                </div>
                <div className={classes.informationPanel}>
                    <InformationPanel
                        orderParams={{text: 'Оформити замовлення', handleClick: () => navigate('/checkout')}}
                    />
                </div>
            </div>
        </div>
    );
};

export default Cart;