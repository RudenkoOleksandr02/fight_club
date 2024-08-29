import React, {useState} from 'react';
import classes from './EditContainer.module.css'
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import Popup from "../../components/ui/Popup/Popup";

const EditContainer = ({children, handleSave, isDisabledBtn}) => {
    const [isOpenPopupSave, setIsOpenPopupSave] = useState(false)

    return (
        <div className={classes.wrapper}>
            {children}
            <div className={classes.save}>
                <PrimaryButton handleClick={() => setIsOpenPopupSave(true)} disabled={isDisabledBtn}>Зберегти зміни</PrimaryButton>
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