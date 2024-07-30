import React, {useEffect, useState} from 'react';
import {ReactComponent as IcoUser} from "../../assets/images/header/ico_user.svg";
import classes from "./User.module.css";
import SecondaryButton from "../../ui/components/Buttons/SecondaryButton/SecondaryButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../store/authSlice";
import PrimaryButton from "../../ui/components/Buttons/PrimaryButton/PrimaryButton";
import Input from "../../ui/components/Input/Input";
import LoginPanel from "../LoginPanel/LoginPanel";

const User = ({openLoginPanel, setOpenLoginPanel}) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

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
        </div>
    );
};

export default User;