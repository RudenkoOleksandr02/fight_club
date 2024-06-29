import React, {useState} from 'react';
import {ReactComponent as IcoUser} from "../../../assets/images/ico_user.svg";
import classes from "./User.module.css";
import ButtonWithIcoRow from "../../UI/Buttons/ButtonWithIcoRow/ButtonWithIcoRow";

const User = () => {
    const [openUserPanel, setOpenUserPanel] = useState(false);

    const userPanel = (
        <div
            className={openUserPanel
                ? `${classes.userPanel + ' ' + classes.open}`
                : classes.userPanel
        }>
            <ButtonWithIcoRow>Мій кабінет</ButtonWithIcoRow>
            <ButtonWithIcoRow>Вибране</ButtonWithIcoRow>
            <ButtonWithIcoRow>Підтримка</ButtonWithIcoRow>
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