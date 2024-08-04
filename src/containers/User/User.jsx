import React from 'react';
import {ReactComponent as IcoUser} from "../../assets/images/header/ico_user.svg";
import classes from "./User.module.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const User = ({openLoginPanel, setOpenLoginPanel}) => {
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <div className={classes.wrapper}>
            <button className={classes.icoBtn} onClick={() => {
                if (isAuth) {
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