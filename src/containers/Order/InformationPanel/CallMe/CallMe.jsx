import React from 'react';
import Die from "../../../../ui/components/Die/Die";
import classes from './CallMe.module.css';

const CallMe = ({additionalInfo, handleChangeAdditionalInfo}) => {
    return (
        <Die>
            <div className={classes.check}>
                <input type='checkbox' id='call' checked={additionalInfo.dontCallMe}
                       onChange={e => handleChangeAdditionalInfo(e.target.checked, 'dontCallMe')}/>
                <label htmlFor='call'>
                    Не дзвоніть мені
                </label>
            </div>
        </Die>
    );
};

export default CallMe;