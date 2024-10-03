import React, {useEffect, useState} from 'react';
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";
import Checkbox from "../../../../ui/inputs/Checkbox/Checkbox";
import classes from './Cashback.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getBalance, getBalanceByPhone, setBalance} from "../../../../../store/cashbackSlice";
import InputMobile from "../../../../ui/inputs/Input/InputMobile";
import SecondaryButton from "../../../../ui/Buttons/SecondaryButton/SecondaryButton";

const Cashback = ({handleChangeCashbackToUse, cashbackToUse, isAuthAdmin}) => {
    const {data, error: cashbackError} = useSelector(state => state.cashback.balance);
    const {isAuth} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // FOR USER
    useEffect(() => {
        if (isAuth && !isAuthAdmin) {
            dispatch(getBalance())
        }
    }, [isAuth, isAuthAdmin]);
    const [checked, setChecked] = useState(false);
    const [localCashbackToUse, setLocalCashbackToUse] = useState(0);

    useEffect(() => {
        if (!Number(cashbackToUse)) {
            setLocalCashbackToUse(data)
        } else {
            setLocalCashbackToUse(cashbackToUse);
            setChecked(true);
        }
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
            {data === 0 || cashbackError ? (
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
                    Ваш доступний кешбек <span>{data}₴</span>. Авторизуйтесь, щоб його використати.
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


    // FOR ADMIN
    useEffect(() => {
        if (isAuthAdmin) {
            dispatch(setBalance(0))
        }
    }, [isAuthAdmin]);
    const [checkedAdmin, setCheckedAdmin] = useState(false);
    const [localAdminCashback, setLocalAdminCashback] = useState(0);

    useEffect(() => {
        if (!Number(cashbackToUse)) {
            setLocalAdminCashback(data);
        } else {
            setLocalAdminCashback(cashbackToUse);
            setCheckedAdmin(true);
        }
    }, [data]);

    const handleCheckUseCashbackAdmin = () => {
        if (checkedAdmin) {
            handleChangeCashbackToUse(0);
            setCheckedAdmin(false);
        } else {
            handleChangeCashbackToUse(localAdminCashback);
            setCheckedAdmin(true);
        }
    };

    const handleChangeUseCashbackAdmin = (value) => {
        if (value === '') {
            setLocalAdminCashback(0);
        } else {
            let newValue = value.replace(/^0+/, '');
            if (newValue === '') {
                newValue = '0';
            }
            const floatValue = parseFloat(newValue);

            if (floatValue === 0) {
                setLocalAdminCashback('0');
            } else if (floatValue <= data) {
                setLocalAdminCashback(newValue);
                handleChangeCashbackToUse(newValue);
            } else {
                setLocalAdminCashback(data);
                handleChangeCashbackToUse(data);
            }
        }
    };

    const forAdminJSX = (
        <div className={classes.forUser}>
            {data === 0 ? (
                <p className={classes.cashbackNotFound}>
                    Кешбек відсутній.
                </p>
            ) : (
                <div className={classes.form}>
                    <Checkbox
                        checked={checkedAdmin}
                        onChange={handleCheckUseCashbackAdmin}
                        text='Використати кешбек'
                    />
                    <div className={`${classes.cashback} ${!checkedAdmin ? classes.disabled : ''}`}>
                        <input
                            type='number'
                            onChange={e => handleChangeUseCashbackAdmin(e.target.value)}
                            min={0}
                            max={data}
                            value={localAdminCashback}
                        /> /
                        <span>{data}₴</span>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <DieBlock>
            {isAuthAdmin ? forAdminJSX : (
                isAuth ? forUserJSX : forGuestJSX
            )}
        </DieBlock>
    );
};

export default Cashback;