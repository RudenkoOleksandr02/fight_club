import React from 'react';
import classes from "./Logout.module.css";
import SecondaryButton from "../../../components/ui/Buttons/SecondaryButton/SecondaryButton";
import {logout} from "../../../store/authSlice";
import {useDispatch} from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();

    return (
        <div className={classes.wrapper}>
            <SecondaryButton handleClick={() => {
                dispatch(logout())
            }}>Вийти з облікового запису</SecondaryButton>
        </div>
    );
};

export default Logout;