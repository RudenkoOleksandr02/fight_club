import React from 'react';
import Die from "../../../../ui/components/Die/Die";
import classes from'./BuyBlock.module.css';
import PrimaryButton from "../../../../ui/components/Buttons/PrimaryButton/PrimaryButton";
import {useNavigate} from "react-router-dom";

const BuyBlock = ({totalPrice, orderParams}) => {
    const navigate = useNavigate()
    const {text, handleClick} = orderParams;

    return (
        <Die>
            <div className={classes.buyBlock}>
                <div className={classes.summaryOrder}>
                    <span>Підсумкова ціна</span>
                    <span>{Math.round(totalPrice)}$</span>
                </div>
                <div className={classes.btns}>
                    <PrimaryButton onClick={handleClick}>
                        {text}
                    </PrimaryButton>
                    <button onClick={() => navigate('/category/1')}>
                        Продовжити покупки
                    </button>
                </div>
            </div>
        </Die>
    );
};

export default BuyBlock;