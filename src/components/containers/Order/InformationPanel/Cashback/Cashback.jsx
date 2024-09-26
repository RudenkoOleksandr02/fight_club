import React, {useEffect, useState} from 'react';
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";
import Checkbox from "../../../../ui/inputs/Checkbox/Checkbox";
import classes from './Cashback.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getBalance, getBalanceByPhone} from "../../../../../store/cashbackSlice";
import InputMobile from "../../../../ui/inputs/Input/InputMobile";
import SecondaryButton from "../../../../ui/Buttons/SecondaryButton/SecondaryButton";

const Cashback = ({handleChangeCashbackToUse}) => {
    const {data, error: cashbackError} = useSelector(state => state.cashback.balance);
    const {isAuth} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // FOR USER
    useEffect(() => {
        if (isAuth) {
            dispatch(getBalance())
        }
    }, [isAuth]);
    const [checked, setChecked] = useState(false);
    const [localCashbackToUse, setLocalCashbackToUse] = useState(0);

    useEffect(() => {
        setLocalCashbackToUse(data);
    }, [data])

    const handleCheckUseCashback = () => {
        if (checked) {
            handleChangeCashbackToUse(0);
            setChecked(false);
        } else {
            handleChangeCashbackToUse(localCashbackToUse);
            setChecked(true);
        }
    }
    const handleChangeUseCashback = (value) => {
        if (value === '') {
            setLocalCashbackToUse(0);
        } else {
            let newValue = value.replace(/^0+/, '');
            if (newValue === '') {
                newValue = '0';
            }
            const floatValue = parseFloat(newValue);

            if (floatValue === 0) {
                setLocalCashbackToUse('0');
            } else if (floatValue <= data) {
                setLocalCashbackToUse(newValue);
                handleChangeCashbackToUse(newValue);
            } else {
                setLocalCashbackToUse(data);
                handleChangeCashbackToUse(data);
            }
        }
    };


    const forUserJSX = (
        <div className={classes.forUser}>
            {data === 0 ? (
                <p className={classes.cashbackNotFound}>
                    Кешбек не нараховано, оскільки покупок не було здійснено.
                </p>
            ) : (
                <div className={classes.form}>
                    <Checkbox
                        checked={checked}
                        onChange={handleCheckUseCashback}
                        text='Використати свій кешбек'
                    />
                    <div className={`${classes.cashback} ${!checked ? classes.disabled : ''}`}>
                        <input type='number'
                               onChange={e => handleChangeUseCashback(e.target.value)}
                               min={0}
                               max={data}
                               value={localCashbackToUse}/> /
                        <span>{data}</span>
                    </div>
                </div>
            )}
        </div>
    );

    // FOR GUEST
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleChangePhoneNumber = phoneNumber => setPhoneNumber(phoneNumber)
    const handleGetCashbackByPhoneNumber = () => {
        dispatch(getBalanceByPhone(phoneNumber));
    }

    const forGuestJSX = (
        <div className={classes.forGuest}>
            {typeof data === 'number' ? (
                <p className={classes.success}>
                    Ваш доступний кешбек <span>{data}$</span>. Авторизуйтесь, щоб його використати.
                </p>
            ) : (
                <>
                    <h3>Кешбек за номером телефону</h3>
                    {cashbackError && <p className={classes.error}>Кешбек не знайдено</p>}
                    <div className={classes.form}>
                        <InputMobile
                            value={phoneNumber}
                            handleChangePhoneNumber={handleChangePhoneNumber}
                        />
                        <SecondaryButton handleClick={handleGetCashbackByPhoneNumber}>
                            Отримати
                        </SecondaryButton>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <DieBlock>
            {isAuth ? forUserJSX : forGuestJSX}
        </DieBlock>
    );
};

export default Cashback;