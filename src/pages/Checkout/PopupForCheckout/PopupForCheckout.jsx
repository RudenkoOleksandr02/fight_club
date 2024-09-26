import React, {useEffect, useState} from 'react';
import classes from "./PopupForCheckout.module.css";
import SecondaryButton from "../../../components/ui/Buttons/SecondaryButton/SecondaryButton";
import {clearCart} from "../../../store/pageSlices/cartPageSlice";
import {Link, useNavigate} from "react-router-dom";
import Popup from "../../../components/ui/Popup/Popup";
import {useDispatch} from "react-redux";

const PopupForCheckout = ({setOpenPopup, email, orderId, setOrderId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [time, setTime] = useState(30);

    useEffect(() => {
        if (orderId !== null) {
            setTime(30);
            const intervalId = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        setOpenPopup(false);
                        navigate('/');
                        setOrderId(null);
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

    return (
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
    );
};

export default PopupForCheckout;