import React from 'react';
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";
import classes from './EcoFriendlyPackaging.module.css';
import Checkbox from "../../../../ui/inputs/Checkbox/Checkbox";

const EcoFriendlyPackaging = ({ecoPackaging, handleChangeAdditionalInfo}) => {
    return (
        <div className={classes.wrapper}>
            <DieBlock title='Екологічна упаковка'>
                <p>Збережи планету – обирай екологічно чисту упаковку!</p>
                <Checkbox onChange={e => handleChangeAdditionalInfo(e.target.checked, 'ecoPackaging')}
                          checked={ecoPackaging}
                          text='Додати опцію'/>
            </DieBlock>
        </div>
    );
};

export default EcoFriendlyPackaging;