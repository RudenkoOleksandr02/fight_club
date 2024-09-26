import React, {useEffect, useState} from 'react';
import classes from './Details.module.css'
import {useDispatch, useSelector} from "react-redux";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import Input from "../../../components/ui/inputs/Input/Input";
import InputMobile from "../../../components/ui/inputs/Input/InputMobile";
import {setUserInformation, updateUser} from "../../../store/pageSlices/userPageSlice";

const Details = () => {
    const {data: userInformation} = useSelector(state => state.userPage.userInformation);
    const dispatch = useDispatch();

    const [localUserInformation, setLocalUserInformation] = useState({
        username: userInformation.username,
        surname: userInformation.surname,
        phoneNumber: userInformation.phoneNumber,
        email: userInformation.email
    });
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    useEffect(() => {
        if (userInformation.username === localUserInformation.username &&
            userInformation.surname === localUserInformation.surname &&
            userInformation.phoneNumber === localUserInformation.phoneNumber &&
            userInformation.email === localUserInformation.email) {
            setIsSaveDisabled(true);
        } else {
            setIsSaveDisabled(false);
        }
    }, [userInformation, localUserInformation])

    const handleChangeUserInformation = (value, key) => {
        setLocalUserInformation(prevState => ({...prevState, [key]: value}));
    }

    const handleChangePhoneNumber = (value) => {
        handleChangeUserInformation(value, 'phoneNumber')
    }

    const handleSaveUserInformation = () => {
        dispatch(updateUser(localUserInformation));
        dispatch(setUserInformation(localUserInformation))
    }

    return (
        <div className={classes.wrapper}>
            <h3>Мої дані</h3>
            <div className={classes.inputs}>
                <Input
                    type='text'
                    placeholder="Ваше ім'я"
                    value={localUserInformation.username}
                    onChange={e => handleChangeUserInformation(e.target.value, 'username')}
                    errors={[]}
                />
                <Input
                    type='text'
                    placeholder="Ваше прізвище"
                    value={localUserInformation.surname}
                    onChange={e => handleChangeUserInformation(e.target.value, 'surname')}
                    errors={[]}
                />
                <InputMobile
                    value={localUserInformation.phoneNumber}
                    handleChangePhoneNumber={handleChangePhoneNumber}
                    errors={[]}
                />
                <Input
                    type='email'
                    placeholder="E-mail"
                    value={localUserInformation.email}
                    onChange={e => handleChangeUserInformation(e.target.value, 'email')}
                    errors={[]}
                />
            </div>
            <PrimaryButton
                onClick={handleSaveUserInformation}
                disabled={isSaveDisabled}>Зберегти</PrimaryButton>
        </div>
    );
};

export default Details;