import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import classes from './Promotional.module.css'
import {clearPromocodes, getPromocodesCheck} from "../../../../../store/promocodesSlice";
import {setUsedPromocode} from "../../../../../store/pageSlices/checkoutPageSlice";
import FormSelect from "../../../../ui/inputs/FormSelect/FormSelect";
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";


const Promotional = ({usedPromocode}) => {
    const dispatch = useDispatch();
    const [promocode, setPromocode] = useState(usedPromocode);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendPromocode = () => {
        dispatch(getPromocodesCheck(promocode))
            .then(response => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setError('');
                    setSuccess('Промокод застосовано');
                    dispatch(setUsedPromocode(promocode));
                } else if (response.meta.requestStatus === 'rejected') {
                    setSuccess('');
                    setError('Невалідний промокод');
                    setPromocode('');
                    dispatch(clearPromocodes());
                    dispatch(setUsedPromocode(""));
                }
            })
    }

    return (
        <div className={classes.wrapper}>
            <DieBlock>
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
            </DieBlock>
        </div>
    );
};

export default Promotional;