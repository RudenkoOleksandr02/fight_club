import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from "./Characterictics.module.css";
import {v4 as uuidv4} from 'uuid';
import SelectButton from "../../../../buttons/SelectButton/SelectButton";
import Preloader from "../../../../../components/ui/Preloader/Preloader";
import {getCharacteristicDescsByTitle} from "../../../../../store/adminSlices/adminCharacteristicsSlice";

const AddCharacteristicsDesc = ({characteristic, setCharacteristics, characteristics, handleAddCharacteristics, handleChangeCharacteristics}) => {
    const dispatch = useDispatch()
    const characteristicsDesc = useSelector(state => state.admin.adminCharacteristics.characteristicDescs);
    const [isOpenPopupCharacteristicsDesc, setIsOpenPopupCharacteristicsDesc] = useState(false);

    useEffect(() => {
        if (isOpenPopupCharacteristicsDesc) {
            dispatch(getCharacteristicDescsByTitle(characteristic.title))
        }
    }, [isOpenPopupCharacteristicsDesc])

    const handleSelectCharacteristicDesc = (desc, characteristicId) => {
        setCharacteristics(prevState => prevState.map(data => {
            if (data.characteristicId === characteristic.characteristicId &&
                characteristics.every(characteristic => characteristic.characteristicId !== characteristicId)
            ) {
                if (data.desc === null) {
                    handleAddCharacteristics({characteristicId, title: characteristic.title, desc})
                    return {characteristicId, title: characteristic.title, desc}
                } else {
                    handleChangeCharacteristics({characteristicId, title: characteristic.title, desc}, characteristic.characteristicId);
                    return { ...data, desc }
                }

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
                            <button className={classes.option} key={uuidv4()}
                                    onClick={() => handleSelectCharacteristicDesc(option.desc, option.id)}>
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