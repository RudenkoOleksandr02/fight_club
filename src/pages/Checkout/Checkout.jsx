import React, {useEffect, useState} from 'react';
import Placing from "./Placing/Placing";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import classes from './Checkout.module.css';
import Popup from "../../components/ui/Popup/Popup";
import SecondaryButton from "../../components/ui/Buttons/SecondaryButton/SecondaryButton";
import {checkout, setDeliveryInfo, setUserInfo} from "../../store/pageSlices/checkoutPageSlice";
import {clearCart} from "../../store/pageSlices/cartPageSlice";
import InformationPanel from "../../components/containers/Order/InformationPanel/InformationPanel";
import TopPanel from "../../components/containers/Order/TopPanel/TopPanel";
import {getUser} from "../../store/pageSlices/userPageSlice";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);

    // --popup--
    const [openPopup, setOpenPopup] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [time, setTime] = useState(30);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (orderId !== null) {
            setOpenPopup(true);
            const intervalId = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        setOpenPopup(false);
                        setOrderId(null);
                        navigate('/');
                        dispatch(clearCart());
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [orderId, navigate, dispatch]);

    // --productsInCart--
    const productsInCart = useSelector(state => state.cartPage.productsInCart);
    useEffect(() => {
        if (productsInCart.length === 0) {
            navigate('/');
        }
    }, [productsInCart.length, navigate]);

    // --Checkout--
    const checkoutData = useSelector(state => state.checkoutPage.params);
    const [errors, setErrors] = useState({
        city: [],
        department: [],
        name: [],
        surname: [],
        phone: [],
        email: []
    });

    useEffect(() => {
        if (isAuth) {
            dispatch(getUser())
                .then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        const user = response.payload;
                        dispatch(setUserInfo({ key: 'name', value: user.username }));
                        dispatch(setUserInfo({ key: 'surname', value: user.surname }));
                        dispatch(setUserInfo({ key: 'phone', value: user.phoneNumber }));
                        dispatch(setUserInfo({ key: 'email', value: user.email }));
                    }
                });
        }
    }, [isAuth, dispatch]);


    const handleSetUserInfo = (value, key) => {
        dispatch(setUserInfo({key, value}));
    };

    const handleSetDeliveryInfo = (value, key) => {
        dispatch(setDeliveryInfo({key, value}));
    };

    const handleCheckoutForGuest = () => {
        dispatch(checkout(checkoutData))
            .then(response => {
                setEmail(checkoutData.userInfo.email);
                if (response.meta.requestStatus === 'fulfilled') {
                    setOrderId(response.payload.orderId);
                } else if (response.meta.requestStatus === 'rejected') {
                    const errors = response.payload.errors;
                    setErrors({
                        city: errors["DeliveryInfo.City"] || [],
                        department: errors["DeliveryInfo.Department"] || [],
                        name: errors["UserInfo.Name"] || [],
                        surname: errors["UserInfo.Surname"] || [],
                        phone: errors["UserInfo.Phone"] || [],
                        email: errors["UserInfo.Email"] || []
                    });
                }
            });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.topPanel}>
                <TopPanel/>
            </div>
            <div className={classes.placing}>
                <Placing
                    userInfo={checkoutData.userInfo}
                    handleSetUserInfo={handleSetUserInfo}
                    handleSetDeliveryInfo={handleSetDeliveryInfo}
                    errors={errors}
                />
            </div>
            <div className={classes.informationPanel}>
                <InformationPanel
                    orderParams={{
                        text: 'Купити',
                        handleClick: () => {
                            handleCheckoutForGuest();
                        }
                    }}
                />
            </div>
            {openPopup && (
                <Popup>
                    <div className={classes.successfulOrder}>
                        <h3>Дякуємо за замовлення!</h3>
                        <p>Замовлення під номером #{orderId} успішно оформлено</p>
                        <p>Ви отримаєте підтвердження на електронну пошту: {email}</p>
                        <div className={classes.links}>
                            <SecondaryButton handleClick={() => {
                                setOpenPopup(false);
                                setTime(30);
                                navigate('/category/1');
                                dispatch(clearCart());
                            }}>
                                Продовжити покупки
                            </SecondaryButton>
                            <Link to='/' onClick={() => {
                                setOpenPopup(false);
                                setTime(30);
                                dispatch(clearCart());
                            }}>
                                На головну сторінку
                            </Link>
                        </div>
                        <p>Закриття через {time}</p>
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default Checkout;
