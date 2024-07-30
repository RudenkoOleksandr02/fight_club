import React, {useEffect, useState} from 'react';
import {ReactComponent as IcoUser} from "../../assets/images/header/ico_user.svg";
import classes from "./User.module.css";
import SecondaryButton from "../../ui/components/Buttons/SecondaryButton/SecondaryButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../store/authSlice";
import PrimaryButton from "../../ui/components/Buttons/PrimaryButton/PrimaryButton";
import Input from "../../ui/components/Input/Input";

const User = () => {
    const [openLoginPanel, setOpenLoginPanel] = useState(false);
    const navigate = useNavigate();
    const [paramsLogin, setParamsLogin] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: [],
        password: []
    });
    const [errorMessage, setErrorMessage] = useState('')
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLoginClick = () => {
        dispatch(login(paramsLogin))
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setOpenLoginPanel(false);
                    navigate('/user');
                } else {
                    if (response.payload.errors) {
                        const errors = response.payload.errors;
                        setErrors({
                            email: errors.Email || [],
                            password: errors.Password || []
                        })
                        setErrorMessage('')
                    } else if (response.payload.message) {
                        setErrors({
                            email: [],
                            password: []
                        })
                        setErrorMessage(response.payload.message)
                    }
                }
            })
    }

    const loginPanel = (
        <div
            className={openLoginPanel
                ? `${classes.userPanel + ' ' + classes.open}`
                : classes.userPanel
            }>
            <h3>Вхід до особистого кабінету</h3>
            <form className={classes.form} onSubmit={e => e.preventDefault()}>
                {errorMessage.length !== 0 && <p className={classes.errorMessage}>{errorMessage}</p>}
                <Input errors={errors.email} type='email' placeholder="E-mail" value={paramsLogin.email}
                       onChange={(e) => setParamsLogin({email: e.target.value, password: paramsLogin.password})}/>
                <Input errors={errors.password} type='password' placeholder="Пароль" value={paramsLogin.password}
                       onChange={(e) => setParamsLogin({email: paramsLogin.email, password: e.target.value})}/>
            </form>
            <PrimaryButton onClick={handleLoginClick}>Увійти</PrimaryButton>
            <SecondaryButton
                handleClick={() => {
                    setOpenLoginPanel(false);
                    navigate('/register')
                }}
            >Реєстрація</SecondaryButton>
        </div>
    )

    return (
        <div className={classes.wrapper}>
            <button className={classes.icoBtn} onClick={() => {
                if (user !== null) {
                    navigate('/user');
                } else if (!openLoginPanel) {
                    setOpenLoginPanel(true);
                } else {
                    setOpenLoginPanel(false);
                }
            }}>
                <IcoUser/>
            </button>
            {loginPanel}
        </div>
    );
};

export default User;