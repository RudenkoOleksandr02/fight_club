import React, {useState} from 'react';
import classes from './Placing.module.css';
import OwnerData from "./OwnerData/OwnerData";
import DeliveryMethod from "./DeliveryMethod/DeliveryMethod";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import {useDispatch, useSelector} from "react-redux";
import InputMobile from "../../../components/ui/inputs/Input/InputMobile";
import SecondaryButton from "../../../components/ui/Buttons/SecondaryButton/SecondaryButton";
import {getBalanceByPhone, setBalance} from "../../../store/cashbackSlice";
import DieBlock from "../../../components/ui/blocks/DieBlock/DieBlock";

const Placing = ({userInfo, handleSetUserInfo, handleSetDeliveryInfo, errors, isAuthAdmin}) => {
    const dispatch = useDispatch();

    const [phoneNumber, setPhoneNumber] = useState('');
    const handleChangePhoneNumber = phoneNumber => setPhoneNumber(phoneNumber);

    const handleChangeCashbackToUse = () => {
        dispatch(getBalanceByPhone(phoneNumber))
            .then(response => {
                if (response.meta.requestStatus === 'rejected') {
                    dispatch(setBalance(0))
                } else {
                    dispatch(setBalance(response.payload))
                }
            })
    }

    return (
        <div className={classes.wrapper}>
            {isAuthAdmin ? (
                <>
                    <DieBlock>
                        <div className={classes.form}>
                            <InputMobile
                                value={phoneNumber}
                                handleChangePhoneNumber={handleChangePhoneNumber}
                            />
                            <SecondaryButton handleClick={handleChangeCashbackToUse}>
                                Отримати
                            </SecondaryButton>
                        </div>
                    </DieBlock>
                    <OwnerData userInfo={userInfo} handleSetUserInfo={handleSetUserInfo} errors={errors} />
                </>
            ) : (
                <>
                    <OwnerData userInfo={userInfo} handleSetUserInfo={handleSetUserInfo} errors={errors}/>
                    <DeliveryMethod handleSetDeliveryInfo={handleSetDeliveryInfo} errors={errors}/>
                    {/*<PaymentMethod/>*/}
                </>
            )}
        </div>
    );
};

export default Placing;