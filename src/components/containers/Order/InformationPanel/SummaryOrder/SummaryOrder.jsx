import React from 'react';
import classes from './SummaryOrder.module.css';
import {roundNumber} from "../../../../../common/utils/roundNumber";
import Die from "../../../../ui/Die/Die";


const SummaryOrder = ({totalPrice, discount}) => {
    return (
            <Die>
                <div className={classes.inner}>
                    <span>Сума замовлення</span>
                    <span>{roundNumber(totalPrice)}$</span>
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