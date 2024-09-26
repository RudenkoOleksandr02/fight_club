import React from 'react';
import classes from './SummaryOrder.module.css';
import {roundNumber} from "../../../../../common/utils/roundNumber";
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";


const SummaryOrder = ({totalPrice, promotionalDiscount, cashbackToUse}) => {
    return (
            <DieBlock>
                <div className={classes.inner}>
                    <span>Сума замовлення</span>
                    <span>{roundNumber(totalPrice)}₴</span>
                </div>
                {promotionalDiscount !== 0 && (
                    <div className={classes.inner + ' ' + classes.discount}>
                        <span>Знижка від промокоду</span>
                        <span>{promotionalDiscount}%</span>
                    </div>
                )}
                {cashbackToUse !== 0 && (
                    <div className={classes.inner + ' ' + classes.discount}>
                        <span>Знижка від кешбеку</span>
                        <span>{cashbackToUse}₴</span>
                    </div>
                )}
            </DieBlock>
    );
};

export default SummaryOrder;