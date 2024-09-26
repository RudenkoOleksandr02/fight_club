import React from 'react';
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";
import Checkbox from "../../../../ui/inputs/Checkbox/Checkbox";
import classes from './CallMe.module.css'

const CallMe = ({additionalInfo, handleChangeAdditionalInfo}) => {
    return (
        <DieBlock>
            <div className={classes.wrapper}>
                <Checkbox
                    text='Не дзвоніть мені'
                    checked={additionalInfo.dontCallMe}
                    onChange={e => handleChangeAdditionalInfo(e.target.checked, 'dontCallMe')}
                />
            </div>
        </DieBlock>
    );
};

export default CallMe;