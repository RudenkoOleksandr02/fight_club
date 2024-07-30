import React from 'react';
import classes from './Placing.module.css';
import NovaPoshta from "../../../containers/NovaPoshta/NovaPoshta";
import Input from "../../../ui/components/Input/Input";

const Placing = ({userInfo, handleSetUserInfo, handleSetDeliveryInfo, errors}) => {
    const recipientDetails = (
        <div className={classes.recipientDetails}>
            <h3>Дані одержувача</h3>
            <form className={classes.form}>
                <Input
                    type='text'
                    placeholder="Ваше ім'я"
                    value={userInfo.name}
                    onChange={e => handleSetUserInfo(e.target.value, 'name')}
                    errors={errors.name}
                />
                <Input
                    type='text'
                    placeholder="Телефон"
                    value={userInfo.phone}
                    onChange={e => handleSetUserInfo(e.target.value, 'phone')}
                    errors={errors.phone}
                />
                <Input
                    type='text'
                    placeholder="Ваше прізвище"
                    value={userInfo.surname}
                    onChange={e => handleSetUserInfo(e.target.value, 'surname')}
                    errors={errors.surname}
                />
                <Input
                    type='email'
                    placeholder="E-mail"
                    value={userInfo.email}
                    onChange={e => handleSetUserInfo(e.target.value, 'email')}
                    errors={errors.email}
                />
            </form>
        </div>
    )
    const deliveryMethodJSX = (
        <div className={classes.deliveryMethod}>
            <h3>Спосіб доставки</h3>
            <NovaPoshta handleSetDeliveryInfo={handleSetDeliveryInfo} errorsCity={errors.city} errorsDepartment={errors.department} />
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