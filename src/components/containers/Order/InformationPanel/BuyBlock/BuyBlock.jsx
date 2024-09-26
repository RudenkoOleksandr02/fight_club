import React from 'react';
import classes from'./BuyBlock.module.css';
import {useNavigate} from "react-router-dom";
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";
import {roundNumber} from "../../../../../common/utils/roundNumber";
import PrimaryButton from "../../../../ui/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../ui/Buttons/SecondaryButton/SecondaryButton";

const BuyBlock = ({orderParams, totalPrice, promotionalDiscount, cashbackToUse}) => {
    const navigate = useNavigate()
    const {text, handleClick} = orderParams;

    const discountedPrice = (totalPrice - cashbackToUse) * (1 - promotionalDiscount / 100);

    return (
        <DieBlock>
            <div className={classes.buyBlock}>
                <div className={classes.summaryOrder}>
                    <span>Підсумкова ціна</span>
                    <span>{roundNumber(discountedPrice)}₴</span>
                </div>
                <div className={classes.btns}>
                    <PrimaryButton onClick={handleClick}>
                        {text}
                    </PrimaryButton>
                    <SecondaryButton handleClick={() => navigate('/category/1')}>
                        Продовжити покупки
                    </SecondaryButton>
                </div>
            </div>
        </DieBlock>
    );
};

export default BuyBlock;