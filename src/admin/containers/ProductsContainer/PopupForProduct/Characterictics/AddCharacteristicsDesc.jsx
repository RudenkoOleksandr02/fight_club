import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from "./Characterictics.module.css";
import {v4 as uuidv4} from 'uuid';
import {getCharacteristicValues} from "../../../../../store/adminSlices/adminProductSlice";
import SelectButton from "../../../../buttons/SelectButton/SelectButton";
import Preloader from "../../../../../components/ui/Preloader/Preloader";

const AddCharacteristicsDesc = ({characteristic, setCharacteristics, characteristics, handleSaveCharacteristics}) => {
    const dispatch = useDispatch()
    const characteristicsDesc = useSelector(state => state.admin.adminProduct.characteristicsOptions);
    const [isOpenPopupCharacteristicsDesc, setIsOpenPopupCharacteristicsDesc] = useState(false);

    useEffect(() => {
        if (isOpenPopupCharacteristicsDesc) {
            dispatch(getCharacteristicValues(characteristic.title))
        }
    }, [isOpenPopupCharacteristicsDesc])

    const handleSelectCharacteristicDesc = (desc, characteristicId) => {
        setCharacteristics(prevState => prevState.map(data => {
            if (data.characteristicId === characteristic.characteristicId &&
                characteristics.every(characteristic => characteristic.characteristicId !== characteristicId)
            ) {
                handleSaveCharacteristics({characteristicId, title: characteristic.title, desc})
                return {characteristicId, title: characteristic.title, desc}
            } else {
                return data
            }
        }))

        setIsOpenPopupCharacteristicsDesc(false);
    };

    return (
        <div className={classes.addCharacteristicsDesc}>
            <SelectButton
                setIsOpenModal={setIsOpenPopupCharacteristicsDesc}
                isOpenModal={isOpenPopupCharacteristicsDesc}
                title={
                    characteristic.desc === null ? 'Опис характеристики' : characteristic.desc
                }
                content={characteristicsDesc.loading
                    ? (
                        <Preloader overflowHidden={false} color='primary'/>
                    ) : (
                        characteristicsDesc.data.map(option => (
                            <button className={classes.option} key={uuidv4()} onClick={() => handleSelectCharacteristicDesc(option.desc, option.id)}>
                                {option.desc}
                            </button>
                        )))}
                modificationStyle={{
                    outlined: false,
                    fontWeightBtn: '400'
                }}
            />
        </div>
    )
};

export default AddCharacteristicsDesc;