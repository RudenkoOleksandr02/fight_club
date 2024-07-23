import React from 'react';
import classes from './Placing.module.css';
import NovaPoshta from "../../../containers/NovaPoshta/NovaPoshta";

const Placing = () => {
    const recipientDetails = (
        <div className={classes.recipientDetails}>
            <h3>Дані одержувача</h3>
            <form className={classes.form}>
                <input type='text' placeholder="Ваше ім'я"/>
                <input type='text' placeholder="Телефон"/>
                <input type='text' placeholder="Ваше прізвище"/>
                <input type='email' placeholder="E-mail"/>
            </form>
        </div>
    )
    const deliveryMethodJSX = (
        <div className={classes.deliveryMethod}>
            <h3>Спосіб доставки</h3>
            <NovaPoshta/>
        </div>
    )
    const paymentMethod = (
        <div className={classes.paymentMethod}>
            <h3>Спосіб оплати</h3>
        </div>
    )
    return (
        <div className={classes.wrapper}>
            {recipientDetails}
            {deliveryMethodJSX}
            {paymentMethod}
        </div>
    );
};

export default Placing;