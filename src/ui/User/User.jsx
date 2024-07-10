import React, {useState} from 'react';
import {ReactComponent as IcoUser} from "../../assets/images/header/ico_user.svg";
import classes from "./User.module.css";
import SecondaryButton from "../../ui/Buttons/SecondaryButton/SecondaryButton";

const User = () => {
    const [openUserPanel, setOpenUserPanel] = useState(false);

    const userPanel = (
        <div
            className={openUserPanel
                ? `${classes.userPanel + ' ' + classes.open}`
                : classes.userPanel
        }>
            <SecondaryButton>Мій кабінет</SecondaryButton>
            <SecondaryButton>Вибране</SecondaryButton>
            <SecondaryButton>Підтримка</SecondaryButton>
        </div>
    )

    return (
        <div className={classes.wrapper}>
            <button className={classes.icoBtn} onClick={() => setOpenUserPanel(!openUserPanel)}>
                <IcoUser/>
            </button>
            {userPanel}
        </div>
    );
};

export default User;