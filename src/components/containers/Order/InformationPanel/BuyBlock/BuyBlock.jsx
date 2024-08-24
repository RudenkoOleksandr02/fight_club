import React from 'react';
import classes from'./BuyBlock.module.css';
import {useNavigate} from "react-router-dom";
import Die from "../../../../ui/Die/Die";
import {roundNumber} from "../../../../../common/utils/roundNumber";
import PrimaryButton from "../../../../ui/Buttons/PrimaryButton/PrimaryButton";

const BuyBlock = ({totalPrice, orderParams}) => {
    const navigate = useNavigate()
    const {text, handleClick} = orderParams;

    return (
        <Die>
            <div className={classes.buyBlock}>
                <div className={classes.summaryOrder}>
                    <span>Підсумкова ціна</span>
                    <span>{roundNumber(totalPrice)}$</span>
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