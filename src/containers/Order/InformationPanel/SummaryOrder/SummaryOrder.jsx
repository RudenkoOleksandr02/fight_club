import React from 'react';
import classes from './SummaryOrder.module.css';

import Die from "../../../../ui/components/Die/Die";

const SummaryOrder = ({totalPrice, discount}) => {
    return (
            <Die>
                <div className={classes.inner}>
                    <span>Сума замовлення</span>
                    <span>{Math.round(totalPrice)}$</span>
                </div>
                {discount !== 0 && (
                    <div className={classes.inner + ' ' + classes.discount}>
                        <span>Знижка</span>
                        <span>{discount}%</span>
                    </div>
                )}
            </Die>
    );
};

export default SummaryOrder;