import React from 'react';
import classes from './CallMe.module.css';
import Die from "../../../../ui/Die/Die";

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