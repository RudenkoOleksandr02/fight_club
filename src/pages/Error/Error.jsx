import React from 'react';
import AbsenceBlock from "../../components/ui/blocks/AbsenceBlock/AbsenceBlock";
import classes from './Error.module.css'

const Error = () => {
    return (
        <div className={classes.wrapper}>
            <AbsenceBlock title='Сторінка відсутня'
                          text='Схоже, що цієї сторінки більше не існує або вона була переміщена. Перевірте правильність введеної адреси або поверніться на головну сторінку.'/>
        </div>
    );
};

export default Error;