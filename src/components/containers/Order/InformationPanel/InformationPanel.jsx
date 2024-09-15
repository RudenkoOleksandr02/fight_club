import React from 'react';
import classes from './InformationPanel.module.css';
import {useDispatch, useSelector} from "react-redux";
import LoyaltyProgram from "./LoyaltyProgram/LoyaltyProgram";
import Promotional from "./Promotional/Promotional";
import EcoFriendlyPackaging from "./EcoFriendlyPackaging/EcoFriendlyPackaging";
import SummaryOrder from "./SummaryOrder/SummaryOrder";
import CallMe from "./CallMe/CallMe";
import BuyBlock from "./BuyBlock/BuyBlock";
import {setAdditionalInfo, setCashbackToUse} from "../../../../store/pageSlices/checkoutPageSlice";
import {selectTotalPrice} from "../../../../store/pageSlices/cartPageSlice";
import Cashback from "./Cashback/Cashback";

const InformationPanel = ({orderParams}) => {
    const totalPrice = useSelector(selectTotalPrice);
    const additionalInfo = useSelector(state => state.checkoutPage.params.additionalInfo);
    const cashbackToUse = useSelector(state => state.checkoutPage.params.cashbackToUse);
    const dispatch = useDispatch();
    const handleChangeAdditionalInfo = (value, key) => {
        dispatch(setAdditionalInfo({ key, value }));
    }
    const handleChangeCashbackToUse = (value) => {
        dispatch(setCashbackToUse(value));
    }
    const discount = useSelector(state => state.promocodes.discount);


    return (
        <div className={classes.wrapper}>
            <LoyaltyProgram/>
            <Promotional/>
            <EcoFriendlyPackaging additionalInfo={additionalInfo} handleChangeAdditionalInfo={handleChangeAdditionalInfo}/>
            <Cashback cashbackToUse={cashbackToUse} handleChangeCashbackToUse={handleChangeCashbackToUse}/>
            <SummaryOrder totalPrice={totalPrice} discount={discount} />
            <BuyBlock orderParams={orderParams} totalPrice={(discount !== 0 ? totalPrice - ((totalPrice / 100) * discount) : totalPrice) - cashbackToUse}/>
            <CallMe additionalInfo={additionalInfo} handleChangeAdditionalInfo={handleChangeAdditionalInfo}/>
        </div>
    );
};

export default InformationPanel;