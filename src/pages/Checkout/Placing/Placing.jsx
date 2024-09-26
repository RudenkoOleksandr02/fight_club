import React from 'react';
import classes from './Placing.module.css';
import OwnerData from "./OwnerData/OwnerData";
import DeliveryMethod from "./DeliveryMethod/DeliveryMethod";
import PaymentMethod from "./PaymentMethod/PaymentMethod";

const Placing = ({userInfo, handleSetUserInfo, handleSetDeliveryInfo, errors}) => {
    return (
        <div className={classes.wrapper}>
            <OwnerData userInfo={userInfo} handleSetUserInfo={handleSetUserInfo} errors={errors}/>
            <DeliveryMethod handleSetDeliveryInfo={handleSetDeliveryInfo} errors={errors}/>
            {/*<PaymentMethod/>*/}
        </div>
    );
};

export default Placing;