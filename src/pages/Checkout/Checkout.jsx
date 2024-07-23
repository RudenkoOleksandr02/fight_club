import React, {useEffect} from 'react';
import TopPanel from "../../containers/Order/TopPanel/TopPanel";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import classes from './Checkout.module.css'
import InformationPanel from "../../containers/Order/InformationPanel/InformationPanel";
import Placing from "./Placing/Placing";

const Checkout = () => {
    const productsInCart = useSelector(state => state.cart.productsInCart);
    const navigate = useNavigate();

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
            <div className={classes.placing}>
                <Placing/>
            </div>
            <div className={classes.informationPanel}>
                <InformationPanel orderParams={{text: 'Купити', handleClick: () => {}}}/>
            </div>
        </div>
    );
};

export default Checkout;