import React from 'react';
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";
import classes from './EcoFriendlyPackaging.module.css';

const EcoFriendlyPackaging = ({additionalInfo, handleChangeAdditionalInfo}) => {
    return (
        <div className={classes.wrapper}>
            <DieBlock title='Екологічна упаковка'>
                <p>Зберегти екологічність нашого світу та купи екологічно чисту упаковку</p>
                <div className={classes.check}>
                    <input type='checkbox' id='check' checked={additionalInfo.ecoPackaging}
                           onChange={e => handleChangeAdditionalInfo(e.target.checked, 'ecoPackaging')}/>
                    <label htmlFor='check'>
                        Додати Опцію
                    </label>
                </div>
            </DieBlock>
        </div>
    );
};

export default EcoFriendlyPackaging;