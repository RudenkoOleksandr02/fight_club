import React from 'react';
import Die from "../../../../ui/Die/Die";
import classes from './EcoFriendlyPackaging.module.css';

const EcoFriendlyPackaging = ({additionalInfo, handleChangeAdditionalInfo}) => {
    return (
        <div className={classes.wrapper}>
            <Die title='Екологічна упаковка'>
                <p>Зберегти екологічність нашого світу та купи екологічно чисту упаковку</p>
                <div className={classes.check}>
                    <input type='checkbox' id='check' checked={additionalInfo.ecoPackaging}
                           onChange={e => handleChangeAdditionalInfo(e.target.checked, 'ecoPackaging')}/>
                    <label htmlFor='check'>
                        Додати Опцію
                    </label>
                </div>
            </Die>
        </div>
    );
};

export default EcoFriendlyPackaging;