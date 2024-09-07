import React from 'react';
import classes from './CallMe.module.css';
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";

const CallMe = ({additionalInfo, handleChangeAdditionalInfo}) => {
    return (
        <DieBlock>
            <div className={classes.check}>
                <input type='checkbox' id='call' checked={additionalInfo.dontCallMe}
                       onChange={e => handleChangeAdditionalInfo(e.target.checked, 'dontCallMe')}/>
                <label htmlFor='call'>
                    Не дзвоніть мені
                </label>
            </div>
        </DieBlock>
    );
};

export default CallMe;