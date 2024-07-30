import React, {useEffect, useState} from 'react';
import TopPanel from "../../containers/Order/TopPanel/TopPanel";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import classes from './Checkout.module.css';
import InformationPanel from "../../containers/Order/InformationPanel/InformationPanel";
import Placing from "./Placing/Placing";
import {checkoutForGuest, setDeliveryInfo, setProducts, setUserInfo} from "../../store/forGuest/checkoutForGuestSlice";

const Checkout = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({
        city: [],
        department: [],
        name: [],
        surname: [],
        phone: [],
        email: []
    })

    /*const productsInCart = useSelector(state => {
        if (user === null) {
            return state.cartForGuest.productsInCart;
        } else {
            return true;
        }
    });*/

    const productsInCart = useSelector(state => state.cartForGuest.productsInCart);

    /*const checkoutData = useSelector(state => {
        if (user === null) {
            return state.checkoutForGuest.params;
        } else {
            return true;
        }
    });*/

    const checkoutData = useSelector(state => {
        return state.checkoutForGuest.params;
    });

    useEffect(() => {
        if (productsInCart.length === 0) {
            navigate('/');
        }
    }, [productsInCart.length]);
    useEffect(() => {
        dispatch(setProducts(productsInCart.map((product) => {
            return {
                productId: product.id,
                productAmount: product.quantity
            }
        })));
    }, [productsInCart])

    const handleSetUserInfo = (value, key) => {
        dispatch(setUserInfo({key, value}));
    };
    const handleSetDeliveryInfo = (value, key) => {
        dispatch(setDeliveryInfo({key, value}));
    }

    const handleCheckoutForGuest = () => {
        dispatch(checkoutForGuest(checkoutData))
            .then(response => {
                if (response.meta.requestStatus === 'fulfilled') {
                    console.log(response.payload.orderId);
                } else if (response.meta.requestStatus === 'rejected') {
                    const errors = response.payload.errors;
                    setErrors({
                        city: errors["DeliveryInfo.City"] || [],
                        department: errors["DeliveryInfo.Department"] || [],
                        name: errors["UserInfo.Name"] || [],
                        surname: errors["UserInfo.Surname"] || [],
                        phone: errors["UserInfo.Phone"] || [],
                        email: errors["UserInfo.Email"] || []
                    })
                }
            })
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.topPanel}>
                <TopPanel path='/cart'/>
            </div>
            <div className={classes.placing}>
                <Placing userInfo={checkoutData.userInfo} handleSetUserInfo={handleSetUserInfo}
                         handleSetDeliveryInfo={handleSetDeliveryInfo} errors={errors}/>
            </div>
            <div className={classes.informationPanel}>
                <InformationPanel
                    orderParams={{
                        text: 'Купити',
                        handleClick: () => {
                            /*if (user === null) {
                                handleCheckoutForGuest()
                            } else {
                                return true
                            }*/
                            handleCheckoutForGuest()
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Checkout;
