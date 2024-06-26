import React, {useState} from 'react';
import {ReactComponent as IcoUser} from "../../../assets/images/ico_user.svg";
import classes from "./User.module.css";
import ButtonWithIco from "../../UI/Buttons/ButtonWithIco/ButtonWithIco";
import ico_row from './../../../assets/images/ico_row.png'

const User = () => {
    const [openUserPanel, setOpenUserPanel] = useState(false);

    const userPanel = (
        <div
            className={openUserPanel
                ? `${classes.userPanel + ' ' + classes.open}`
                : classes.userPanel
        }>
            <ButtonWithIco icon={ico_row}>Мой кабинет</ButtonWithIco>
            <ButtonWithIco icon={ico_row}>Избранное</ButtonWithIco>
            <ButtonWithIco icon={ico_row}>Поддержка</ButtonWithIco>
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