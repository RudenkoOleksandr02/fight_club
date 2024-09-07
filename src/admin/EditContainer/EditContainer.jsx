import React, {useState} from 'react';
import classes from './EditContainer.module.css'
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import Popup from "../../components/ui/Popup/Popup";
import IcoButton from "../buttons/IcoButton/IcoButton";
import {ReactComponent as IcoClose} from './../images/icoClose.svg'

const EditContainer = ({children, handleSave, isDisabledSave, handleClose}) => {
    const [isOpenPopupSave, setIsOpenPopupSave] = useState(false)

    return (
        <div className={classes.wrapper}>
            <div className={classes.close}>
                <IcoButton svgIco={<IcoClose/>} onClick={handleClose}/>
            </div>
            {children}
            <div className={classes.save}>
                <PrimaryButton handleClick={() => setIsOpenPopupSave(true)} disabled={isDisabledSave}>Зберегти зміни</PrimaryButton>
            </div>
            {isOpenPopupSave && (
                <Popup>
                    <div className={classes.popup}>
                        <PrimaryButton handleClick={handleSave}>Зберегти зміни</PrimaryButton>
                        <PrimaryButton handleClick={() => setIsOpenPopupSave(false)}>Редагувати
                            далі</PrimaryButton>
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default EditContainer;