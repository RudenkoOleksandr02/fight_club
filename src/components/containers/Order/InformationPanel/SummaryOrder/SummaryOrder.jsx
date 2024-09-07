import React from 'react';
import classes from './SummaryOrder.module.css';
import {roundNumber} from "../../../../../common/utils/roundNumber";
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";


const SummaryOrder = ({totalPrice, discount}) => {
    return (
            <DieBlock>
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
            </DieBlock>
    );
};

export default SummaryOrder;