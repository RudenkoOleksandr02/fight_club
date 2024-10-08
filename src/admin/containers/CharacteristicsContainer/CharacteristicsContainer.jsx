import React, {useEffect, useState} from 'react';
import classes from './CharacteristicsContainer.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    getAdminCharacteristics,
    deleteCharacteristicById,
    getCharacteristicDescsByTitle,
    getCharacteristicTitlesBySearchTerm, deleteCharacteristicAll
} from "../../../store/adminSlices/adminCharacteristicsSlice";
import TopPanel from "../../TopPanel/TopPanel";
import SecondaryButton from "../../buttons/SecondaryButton/SecondaryButton";
import BottomPanel from "../../BottomPanel/BottomPanel";
import CharacteristicsTable from "./CharacteristicsTable/CharacteristicsTable";
import EditCharacteristic from "./EditCharacteristic/EditCharacteristic";
import AddCharacteristic from "./AddCharacteristic/AddCharacteristic";

const CharacteristicsContainer = ({currentPage, setCurrentPage, amount, setAmount}) => {
    const [isOpenPopupEdit, setIsOpenPopupEdit] = useState(false);
    const [isOpenPopupAdd, setIsOpenPopupAdd] = useState(false);
    const {
        data: characteristicsData,
        loading: characteristicsLoading
    } = useSelector(state => state.admin.adminCharacteristics.characteristics);
    const dispatch = useDispatch();

    const [currentTitle, setCurrentTitle] = useState(null);

    useEffect(() => {
        dispatch(getAdminCharacteristics())
    }, [])

    const startIndex = (currentPage - 1) * amount;
    const displayedCharacteristics = characteristicsData.slice(startIndex, startIndex + amount);
    const handleClickEdit = (characteristicTitle) => {
        setCurrentTitle(characteristicTitle)
        setIsOpenPopupEdit(true);
    }

    const handleDeleteCharacteristicById = (characteristicId) => {
        dispatch(deleteCharacteristicById(characteristicId))
            .then(() => dispatch(getCharacteristicTitlesBySearchTerm('')))
    }

    const handleDeleteCharacteristicAll = (title) => {
        dispatch(deleteCharacteristicAll(title))
    }

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={characteristicsData.length}
                setCurrentPage={setCurrentPage}
            >
                <SecondaryButton handleClick={() => setIsOpenPopupAdd(true)}>Додати характеристику</SecondaryButton>
            </TopPanel>
            <CharacteristicsTable
                characteristicsData={displayedCharacteristics}
                handleClickEdit={handleClickEdit}
                handleDeleteCharacteristicAll={handleDeleteCharacteristicAll}
                characteristicsLoading={characteristicsLoading}
            />
            <EditCharacteristic
                isOpenPopupEdit={isOpenPopupEdit}
                setIsOpenPopupEdit={setIsOpenPopupEdit}
                currentTitle={currentTitle}
                characteristicsData={characteristicsData}
            />
            <AddCharacteristic isOpenPopupAdd={isOpenPopupAdd} setIsOpenPopupAdd={setIsOpenPopupAdd}/>
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={characteristicsData.length}
                setCurrentPage={setCurrentPage}
                setAmount={setAmount}
                amountTitle='Кількість показаних характеристик'
            />
        </div>
    );
};

export default CharacteristicsContainer;