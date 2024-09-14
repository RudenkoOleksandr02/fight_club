import React from 'react';
import classes from './InformationPanel.module.css';
import { useDispatch, useSelector } from "react-redux";
import LoyaltyProgram from "./LoyaltyProgram/LoyaltyProgram";
import Promotional from "./Promotional/Promotional";
import EcoFriendlyPackaging from "./EcoFriendlyPackaging/EcoFriendlyPackaging";
import SummaryOrder from "./SummaryOrder/SummaryOrder";
import CallMe from "./CallMe/CallMe";
import BuyBlock from "./BuyBlock/BuyBlock";
import { setAdditionalInfo } from "../../../../store/pageSlices/checkoutPageSlice";
import { selectTotalPrice } from "../../../../store/pageSlices/cartPageSlice";
import {setCashbackToUse} from "../../../../store/pageSlices/checkoutPageSlice";

const InformationPanel = ({ orderParams }) => {
    const totalPrice = useSelector(selectTotalPrice);
    const additionalInfo = useSelector(state => state.checkoutPage.params.additionalInfo);
    const dispatch = useDispatch();
    const handleChangeAdditionalInfo = (value, key) => {
        dispatch(setAdditionalInfo({ key, value }));
    };

    const discount = useSelector(state => state.promocodes.discount);
    const cashbackToUse = useSelector(state => state.checkoutPage.params.cashbackToUse);
    const cashbackBalance = useSelector(state => state.checkoutPage.cashbackBalance);
    const isAuth = useSelector(state => state.auth.isAuth);

    // Розрахунок загальної суми з урахуванням знижок та кешбеку
    const discountedPrice = discount ? totalPrice - (totalPrice * discount / 100) : totalPrice;
    const finalPrice = discountedPrice - cashbackToUse;

    return (
        <div className={classes.wrapper}>
            <LoyaltyProgram />
            <Promotional />
            {isAuth && (
                <div className={classes.cashback}>
                    <h4>Ваш баланс кешбеку: {cashbackBalance}</h4>
                    <label>Використати кешбек:</label>
                    <input
                        type="number"
                        min="0"
                        max={cashbackBalance}
                        value={cashbackToUse}
                        onChange={(e) => {
                            let value = parseFloat(e.target.value);
                            if (isNaN(value)) {
                                value = 0;
                            } else if (value > cashbackBalance) {
                                value = cashbackBalance;
                            } else if (value < 0) {
                                value = 0;
                            }
                            dispatch(setCashbackToUse(value));
                        }}
                    />
                </div>
            )}
            <EcoFriendlyPackaging
                additionalInfo={additionalInfo}
                handleChangeAdditionalInfo={handleChangeAdditionalInfo}
            />
            <SummaryOrder totalPrice={finalPrice} discount={discount} />
            <BuyBlock
                orderParams={orderParams}
                totalPrice={finalPrice}
            />
            <CallMe
                additionalInfo={additionalInfo}
                handleChangeAdditionalInfo={handleChangeAdditionalInfo}
            />
        </div>
    );
};

export default InformationPanel;
