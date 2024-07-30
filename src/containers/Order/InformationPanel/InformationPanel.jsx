import React, {useState} from 'react';
import classes from './InformationPanel.module.css';
import {v4 as uuidv4} from 'uuid'
import FormSelect from "../../../ui/components/FormSelect/FormSelect";
import {useDispatch, useSelector} from "react-redux";
import {selectTotalPrice} from "../../../store/forGuest/cartForGuestSlice";
import PrimaryButton from "../../../ui/components/Buttons/PrimaryButton/PrimaryButton";
import {useNavigate} from "react-router-dom";
import {setAdditionalInfo} from "../../../store/forGuest/checkoutForGuestSlice";
import {getPromocodesCheck} from "../../../store/promocodesSlice";

// --DATA--
const loyaltyProgram = [
    {id: 1, content: 'Промокод на знижку 7%'},
    {id: 2, content: 'Безкоштовна доставка від 1500 грн'},
    {id: 3, content: 'Кешбек 3%'},
    {id: 4, content: 'Подарунок за покупку'}
]

const InformationPanel = ({orderParams}) => {
    const navigate = useNavigate();
    const totalPrice = useSelector(selectTotalPrice);
    const user = useSelector(state => state.auth.user);
    /*const additionalInfo = useSelector(state => {
        if (user === null) {
            return state.checkoutForGuest.params.additionalInfo;
        } else {
            return true
        }
    });*/
    const additionalInfo = useSelector(state => state.checkoutForGuest.params.additionalInfo);
    const dispatch = useDispatch();
    const handleChangeAdditionalInfo = (value, key) => {
        dispatch(setAdditionalInfo({ key, value }));
    }

    const [promocode, setPromocode] = useState('');
    const discount = useSelector(state => state.promocodes.discount);
    const handleSendPromocode = () => {
        dispatch(getPromocodesCheck(promocode))
            .then(response => {
                console.log(response)
            })
    }


    const loyaltyProgramJSX = (
        <div className={classes.loyaltyProgram}>
            <h3>Програма лояльності</h3>
            <div className={classes.inner}>
                {loyaltyProgram.map(item => {
                    return <div className={classes.item} key={uuidv4()}>
                        {item.content}
                    </div>
                })}
            </div>
        </div>
    )
    const promotionalJSX = (
        <div className={classes.promotional}>
            <FormSelect type='text' text='Промокод' color='secondary' handleSend={handleSendPromocode} value={promocode} onChange={e => setPromocode(e.target.value)}/>
        </div>
    )
    const ecoFriendlyPackagingJSX = (
        <div className={classes.ecoFriendlyPackaging}>
            <h3>Екологічна упаковка</h3>
            <p>Зберегти екологічність нашого світу та купи екологічно чисту упаковку</p>
            <div className={classes.check}>
                <input type='checkbox' id='check' checked={additionalInfo.ecoPackaging} onChange={e => handleChangeAdditionalInfo(e.target.checked, 'ecoPackaging')}/>
                <label htmlFor='check'>
                    Додати Опцію
                </label>
            </div>
        </div>
    )
    const summaryOrderJSX = (
        <div className={classes.summaryOrder}>
            <span>Сума замовлення</span>
            <span>{Math.round(totalPrice)}$</span>
        </div>
    )

    const {text, handleClick} = orderParams;
    const buyBlockJSX = (
        <div className={classes.buyBlock}>
            <div className={classes.summaryOrder}>
                <span>Сума</span>
                <span>{Math.round(totalPrice)}$</span>
            </div>
            <div className={classes.btns}>
                <PrimaryButton onClick={handleClick}>
                    {text}
                </PrimaryButton>
                <button onClick={() => navigate('/category/1')}>
                    Продовжити покупки
                </button>
            </div>
        </div>
    )
    const callMeJSX = (
        <div className={classes.check}>
            <input type='checkbox' id='call' checked={additionalInfo.dontCallMe} onChange={e => handleChangeAdditionalInfo(e.target.checked, 'dontCallMe')}/>
            <label htmlFor='call'>
                Не дзвоніть мені
            </label>
        </div>
    )

    return (
        <div className={classes.wrapper}>
            {loyaltyProgramJSX}
            {promotionalJSX}
            {ecoFriendlyPackagingJSX}
            {summaryOrderJSX}
            {buyBlockJSX}
            {callMeJSX}
        </div>
    );
};

export default InformationPanel;