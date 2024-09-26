import React from 'react';
import classes from './InformationPanel.module.css';
import {useDispatch, useSelector} from "react-redux";
import Promotional from "./Promotional/Promotional";
import EcoFriendlyPackaging from "./EcoFriendlyPackaging/EcoFriendlyPackaging";
import SummaryOrder from "./SummaryOrder/SummaryOrder";
import CallMe from "./CallMe/CallMe";
import BuyBlock from "./BuyBlock/BuyBlock";
import {setAdditionalInfo, setCashbackToUse} from "../../../../store/pageSlices/checkoutPageSlice";
import {selectTotalPrice} from "../../../../store/pageSlices/cartPageSlice";
import Cashback from "./Cashback/Cashback";
import LoyaltyProgram from "../../../ui/blocks/LoyaltyProgram/LoyaltyProgram";
import DieBlock from "../../../ui/blocks/DieBlock/DieBlock";

const InformationPanel = ({orderParams}) => {
    const additionalInfo = useSelector(state => state.checkoutPage.params.additionalInfo);
    const cashbackToUse = useSelector(state => state.checkoutPage.params.cashbackToUse);
    const promotionalDiscount = useSelector(state => state.promocodes.discount);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch();


    const handleChangeAdditionalInfo = (value, key) => {
        dispatch(setAdditionalInfo({ key, value }));
    }
    const handleChangeCashbackToUse = (value) => {
        dispatch(setCashbackToUse(value));
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.loyaltyProgram}>
                <DieBlock>
                    <LoyaltyProgram/>
                </DieBlock>
            </div>
            <Promotional/>
            <EcoFriendlyPackaging
                ecoPackaging={additionalInfo.ecoPackaging}
                handleChangeAdditionalInfo={handleChangeAdditionalInfo}
            />
            <Cashback
                handleChangeCashbackToUse={handleChangeCashbackToUse}
            />
            <SummaryOrder
                totalPrice={totalPrice}
                cashbackToUse={cashbackToUse}
                promotionalDiscount={promotionalDiscount}
            />
            <BuyBlock
                orderParams={orderParams}
                totalPrice={totalPrice}
                cashbackToUse={cashbackToUse}
                promotionalDiscount={promotionalDiscount}
            />
            <CallMe
                additionalInfo={additionalInfo}
                handleChangeAdditionalInfo={handleChangeAdditionalInfo}
            />
        </div>
    );
};

export default InformationPanel;