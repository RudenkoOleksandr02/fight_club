import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import SecondaryButton from "../../ui/components/Buttons/SecondaryButton/SecondaryButton";
import {logout} from "../../store/authSlice";
import classes from "./UserPage.module.css";

const UserPage = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/')
        }
    }, [user])

    return (
        <div className={classes.wrapper}>
            <div className={classes.leftPanel}>
                <div className={classes.myDetails}>
                    <h3>Мої дані</h3>
                    <form className={classes.form}>
                        <input type='text' placeholder="Ваше ім'я"/>
                        <input type='text' placeholder="Ваше прізвище"/>
                        <input type='text' placeholder="Телефон"/>
                        <input type='email' placeholder="E-mail"/>
                    </form>
                </div>
                <div className={classes.purchaseHistory}>
                    <h3>Історія покупок</h3>
                </div>
                <div className={classes.logout}>
                    <SecondaryButton handleClick={() => {
                        dispatch(logout())
                    }}>Вийти з облікового запису</SecondaryButton>
                </div>
            </div>
            <div className={classes.rightPanel}>
                <div className={classes.loyaltyProgram}>
                    <h3>Програма лояльності</h3>
                </div>
                <div className={classes.favorites}>
                    <h3>Вибране</h3>
                </div>
            </div>
        </div>
    );
};

export default UserPage;