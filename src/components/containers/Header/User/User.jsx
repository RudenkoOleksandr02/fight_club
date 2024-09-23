import React from 'react';
import { ReactComponent as IcoUser } from "../../../../assets/images/header/ico_user.svg";
import classes from "./User.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const User = ({ openLoginPanel, setOpenLoginPanel, userButtonRef }) => {
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.auth.isAuth);

    const handleButtonClick = () => {
        if (isAuth) {
            navigate('/user');
        } else {
            setOpenLoginPanel(prev => !prev);
        }
    };

    return (
        <button ref={userButtonRef} className={classes.icoBtn} onClick={handleButtonClick}>
            <IcoUser />
        </button>
    );
};

export default User;
