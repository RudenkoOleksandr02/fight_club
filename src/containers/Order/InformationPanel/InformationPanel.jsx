import React from 'react';
import classes from './InformationPanel.module.css';
import {useDispatch, useSelector} from "react-redux";
import {selectTotalPrice} from "../../../store/cartSlice";
import LoyaltyProgram from "./LoyaltyProgram/LoyaltyProgram";
import Promotional from "./Promotional/Promotional";
import EcoFriendlyPackaging from "./EcoFriendlyPackaging/EcoFriendlyPackaging";
import SummaryOrder from "./SummaryOrder/SummaryOrder";
import CallMe from "./CallMe/CallMe";
import BuyBlock from "./BuyBlock/BuyBlock";
import {setAdditionalInfo} from "../../../store/checkoutSlice";

const InformationPanel = ({orderParams}) => {
    const totalPrice = useSelector(selectTotalPrice);
    const additionalInfo = useSelector(state => state.checkout.params.additionalInfo);
    const dispatch = useDispatch();
    const handleChangeAdditionalInfo = (value, key) => {
        dispatch(setAdditionalInfo({ key, value }));
    }
    const discount = useSelector(state => state.promocodes.discount);

    return (
        <div className={classes.wrapper}>
            <LoyaltyProgram/>
            <Promotional/>
            <EcoFriendlyPackaging additionalInfo={additionalInfo} handleChangeAdditionalInfo={handleChangeAdditionalInfo}/>
            <SummaryOrder totalPrice={totalPrice} discount={discount} />
            <BuyBlock orderParams={orderParams} totalPrice={discount !== 0 ? totalPrice - (totalPrice / discount) : totalPrice}/>
            <CallMe additionalInfo={additionalInfo} handleChangeAdditionalInfo={handleChangeAdditionalInfo}/>
        </div>
    );
};

export default InformationPanel;