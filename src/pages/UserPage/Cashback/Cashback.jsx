import React from 'react';
import classes from './Cashback.module.css';
import {useSelector} from "react-redux";

const Cashback = () => {
    const {data: cashbackData} = useSelector(state => state.cashback.balance);

    return (
        <div className={classes.wrapper}>
            <p>Доступний кешбек: <span>{cashbackData}₴</span></p>
        </div>
    );
};

export default Cashback;