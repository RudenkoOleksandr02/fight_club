import React from 'react';
import DieBlock from "../../../../components/ui/blocks/DieBlock/DieBlock";
import classes from "./OwnerData.module.css";
import Input from "../../../../components/ui/inputs/Input/Input";
import InputMobile from "../../../../components/ui/inputs/Input/InputMobile";

const OwnerData = ({userInfo, handleSetUserInfo, errors}) => {
    return (
        <DieBlock title='Дані одержувача'>
            <form className={classes.form}>
                <Input
                    type='text'
                    placeholder="Ваше ім'я*"
                    value={userInfo.name}
                    onChange={e => handleSetUserInfo(e.target.value, 'name')}
                    errors={errors.name}
                />
                <InputMobile
                    placeholder="Телефон*"
                    handleChangePhoneNumber={value => handleSetUserInfo(value, 'phone')}
                    errors={errors.phone}
                    value={userInfo.phone}
                />
                <Input
                    type='text'
                    placeholder="Ваше прізвище*"
                    value={userInfo.surname}
                    onChange={e => handleSetUserInfo(e.target.value, 'surname')}
                    errors={errors.surname}
                />
                <Input
                    type='email'
                    placeholder="E-mail*"
                    value={userInfo.email}
                    onChange={e => handleSetUserInfo(e.target.value, 'email')}
                    errors={errors.email}
                />
            </form>
        </DieBlock>
    );
};

export default OwnerData;