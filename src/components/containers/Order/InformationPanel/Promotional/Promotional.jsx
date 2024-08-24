import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import classes from './Promotional.module.css'
import {getPromocodesCheck} from "../../../../../store/promocodesSlice";
import {setUsedPromocode} from "../../../../../store/checkoutPageSlice";
import FormSelect from "../../../../ui/inputs/FormSelect/FormSelect";
import Die from "../../../../ui/Die/Die";


const Promotional = () => {
    const dispatch = useDispatch();
    const [promocode, setPromocode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendPromocode = () => {
        dispatch(getPromocodesCheck(promocode))
            .then(response => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setError('');
                    setSuccess('Промокод задіяний');
                    dispatch(setUsedPromocode(promocode));
                } else if (response.meta.requestStatus === 'rejected') {
                    setSuccess('');
                    setError('Невалідний промокод');
                }
            })
    }

    return (
        <div className={classes.wrapper}>
            <Die>
                <FormSelect
                    type='text'
                    text='Промокод'
                    color='secondary'
                    handleSend={handleSendPromocode}
                    value={promocode}
                    onChange={e => setPromocode(e.target.value)}
                    error={error}
                    success={success}
                />
            </Die>
        </div>
    );
};

export default Promotional;