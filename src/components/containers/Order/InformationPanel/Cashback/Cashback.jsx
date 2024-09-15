import React, {useEffect, useState} from 'react';
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";
import Checkbox from "../../../../ui/inputs/Checkbox/Checkbox";
import classes from './Cashback.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getBalance, getBalanceByPhone} from "../../../../../store/cashbackSlice";

const Cashback = ({cashbackToUse, handleChangeCashbackToUse}) => {
    const {data, loading} = useSelector(state => state.cashback.balance);
    const {isAuth, loading: authLoading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false);
    const [tel, setTel] = useState('');
    const [error, setError] = useState(false);


    useEffect(() => {
        if (isAuth) {
            dispatch(getBalance())
                .then(response => {
                    if (response.payload === undefined) {
                        setError(true)
                    } else {
                        setError(false)
                    }
                })
        }
    }, [isAuth]);

    const handleGetCashbackByPhoneNumber = () => {
        dispatch(getBalanceByPhone(tel))
            .then(response => {
                if (response.payload === undefined) {
                    setError(true)
                } else {
                    setError(false)
                }
            })
    }
    
    return (
        <DieBlock>
            <div className={classes.wrapper}>
                {!isAuth ? (
                    typeof data === 'number' ? (
                        <div className={classes.forIsAuth}>
                            <div>
                                Ваш доступний кешбек {data}. Зареєструйтесь, щоб його використати
                            </div>
                        </div>
                    ) : (
                        <div className={classes.forIsntAuth}>
                            <p>Кешбек за номером телефона</p>
                            <div>
                                <input
                                    type='tel'
                                    onChange={e => setTel(e.target.value)}
                                    value={tel}
                                    placeholder='Телефон'
                                />
                                <button onClick={handleGetCashbackByPhoneNumber}>
                                    Отримати
                                </button>
                            </div>
                            {error && (
                                <p className={classes.error}>Кешбек за вашим номером телефону не знайдено</p>
                            )}
                        </div>
                    )
                ) : (
                    error || data === 0 ? (
                        <p className={classes.error}>Кешбек за вашим номером телефону не знайдено</p>
                    ) : (
                        < div className={classes.forIsAuth}>
                            <Checkbox
                                checked={checked}
                                onChange={() => {
                                    if (checked) {
                                        handleChangeCashbackToUse(0);
                                        setChecked(false);
                                    } else {
                                        setChecked(true);
                                    }
                                }}
                                text='Використати свій кешбек'
                            />
                            <div className={`${classes.cashback} ${!checked ? classes.disabled : ''}`}>
                                <input type='number'
                                       onChange={e => handleChangeCashbackToUse(e.target.value)}
                                       min={0}
                                       max={data}
                                       value={cashbackToUse}/> /
                                <span>{data}</span>
                            </div>
                        </div>
                    )
                )}
            </div>
        </DieBlock>
    );
};

export default Cashback;