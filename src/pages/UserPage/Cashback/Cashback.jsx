import React from 'react';
import classes from './Cashback.module.css';
import {useSelector} from "react-redux";

const Cashback = () => {
    const {data: cashbackData, error} = useSelector(state => state.cashback.balance);

    return (
        <div className={classes.wrapper}>
            <p>Доступний кешбек: <span>{error ? 0 : cashbackData}₴</span></p>
        </div>
    );
};

export default Cashback;