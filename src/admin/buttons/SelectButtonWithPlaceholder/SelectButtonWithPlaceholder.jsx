import React from 'react';
import SelectButton from "../SelectButton/SelectButton";
import classes from './SelectButtonWithPlaceholder.module.css'

const SelectButtonWithPlaceholder = ({content, title, isOpenModal, setIsOpenModal, placeholder = ''}) => {
    return (
        <div className={classes.wrapper}>
            <span className={classes.placeholder}>{placeholder}</span>
            <SelectButton
                modificationStyle={{
                    outlined: false,
                    fontWeightBtn: 400
                }}
                content={content}
                title={title}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            />
        </div>
    );
};

export default SelectButtonWithPlaceholder;