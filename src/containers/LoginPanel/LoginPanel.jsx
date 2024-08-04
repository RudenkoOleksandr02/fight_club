import React, {useEffect, useRef, useState} from 'react';
import classes from "./LoginPanel.module.css";
import Input from "../../ui/components/Input/Input";
import PrimaryButton from "../../ui/components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../ui/components/Buttons/SecondaryButton/SecondaryButton";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../store/authSlice";
import Popup from "../../ui/components/Popup/Popup";
import useScreen from "../../common/hooks/useScreen/useScreen";

const LoginPanel = ({openLoginPanel, setOpenLoginPanel}) => {
    const navigate = useNavigate();
    const [paramsLogin, setParamsLogin] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: [],
        password: []
    });
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const panelRef = useRef(null);
    const isSmallScreen = useScreen(768);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setOpenLoginPanel(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setOpenLoginPanel]);

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
                        });
                        setErrorMessage('');
                    } else if (response.payload.message) {
                        setErrors({
                            email: [],
                            password: []
                        });
                        setErrorMessage(response.payload.message);
                    }
                }
            });
    };

    const contentLoginJSX = <>
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
                navigate('/register');
            }}
        >Реєстрація</SecondaryButton>
    </>

    return <div className={classes.wrapper}>
        {!isSmallScreen && (
            <div
                className={
                    openLoginPanel
                        ? `${classes.desktopLogin} ${classes.open}`
                        : classes.desktopLogin
                }
                ref={panelRef}
            >
                {contentLoginJSX}
            </div>
        )}
        {isSmallScreen && (
            <div
                className={
                    openLoginPanel
                        ? `${classes.mobileLogin} ${classes.open}`
                        : classes.mobileLogin
                }
            >
                <div className={classes.content} ref={panelRef}>
                    {contentLoginJSX}
                </div>
            </div>
        )}
    </div>
};

export default LoginPanel;
