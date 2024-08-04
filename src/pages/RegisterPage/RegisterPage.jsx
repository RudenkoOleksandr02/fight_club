import React, {useEffect, useState} from 'react';
import classes from './RegisterPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Input from "../../ui/components/Input/Input";
import SecondaryButton from "../../ui/components/Buttons/SecondaryButton/SecondaryButton";
import {register} from "../../store/authSlice";

const RegisterPage = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [params, setParams] = useState({
        username: '',
        surname: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        username: [],
        surname: [],
        email: [],
        phoneNumber: [],
        password: [],
        confirmPassword: []
    })

    const handleRegisterClick = () => {
        dispatch(register(params))
            .then(response => {
                if (response.meta.requestStatus === 'fulfilled') {
                    navigate('/user');
                } else if (response.meta.requestStatus === 'rejected') {
                    if (response.payload.errors) {
                        const errors = response.payload.errors;
                        setErrors({
                                username: errors.Username || [],
                                surname: errors.Surname || [],
                                email: errors.Email || [],
                                phoneNumber: errors.PhoneNumber || [],
                                password: errors.Password || [],
                                confirmPassword: errors.ConfirmPassword || [],
                        })
                    }
                }
            })
    }

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth])

    return (
        <div className={classes.wrapper}>
            <form className={classes.form} onSubmit={e => e.preventDefault()}>
                <Input errors={errors.username} type='text' placeholder="Ваше ім'я*" value={params.username} onChange={e => setParams({...params, username: e.target.value})}/>
                <Input errors={errors.surname} type='text' placeholder="Ваше прізвище*" value={params.surname} onChange={e => setParams({...params, surname: e.target.value})}/>
                <Input errors={errors.email} type='email' placeholder="E-mail*" value={params.email} onChange={e => setParams({...params, email: e.target.value})}/>
                <Input errors={errors.phoneNumber} type='text' placeholder="Телефон*" value={params.phoneNumber} onChange={e => setParams({...params, phoneNumber: e.target.value})}/>
                <Input errors={errors.password} type='password' placeholder="Пароль*" value={params.password} onChange={e => setParams({...params, password: e.target.value})}/>
                <Input errors={errors.confirmPassword} type='password' placeholder="Повтор пароля*" value={params.confirmPassword} onChange={e => setParams({...params, confirmPassword: e.target.value})}/>
                <SecondaryButton handleClick={handleRegisterClick}>Зареєструватися</SecondaryButton>
            </form>
        </div>
    );
};

export default RegisterPage;