import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from "./Characterictics.module.css";
import {ReactComponent as IcoPlus} from './../../../../images/icoPlus.svg';
import {v4 as uuidv4} from 'uuid';
import ButtonWithModal from "../../../../buttons/ButtonWithModal/ButtonWithModal";
import PrimaryButton from "../../../../buttons/PrimaryButton/PrimaryButton";
import ContentWithSearch from "../../../../ContentWithSearch/ContentWithSearch";
import {getCharacteristicTitlesBySearchTerm} from "../../../../../store/adminSlices/adminCharacteristicsSlice";

const AddCharacteristicsTitle = ({setCharacteristics}) => {
    const dispatch = useDispatch();
    const characteristicsTitle = useSelector(state => state.admin.adminCharacteristics.characteristicTitles);
    const [isOpenPopupCharacteristicsTitle, setIsOpenPopupCharacteristicsTitle] = useState(false);
    const [searchCharacteristicsTitle, setSearchCharacteristicsTitle] = useState('');
    useEffect(() => {
        dispatch(getCharacteristicTitlesBySearchTerm(searchCharacteristicsTitle));
    }, [searchCharacteristicsTitle]);
    const [mutatedCharacteristicsTitle, setMutatedCharacteristicsTitle] = useState([])
    useEffect(() => {
        setMutatedCharacteristicsTitle(characteristicsTitle.data.map(item => ({
            title: item.title,
            characteristicId: uuidv4(),
            desc: null
        })))
    }, [characteristicsTitle.data])
    const handleSelectCharacteristicTitle = (characteristicId) => {
        const handleCharacteristicTitle = mutatedCharacteristicsTitle.find(characteristic => characteristic.characteristicId === characteristicId)
        setCharacteristics(prevState => [...prevState, handleCharacteristicTitle]);
        setIsOpenPopupCharacteristicsTitle(false)
    };

    return (
        <ButtonWithModal
            button={
                <div className={classes.btn}>
                    <PrimaryButton handleClick={() => setIsOpenPopupCharacteristicsTitle(prevState => !prevState)}>
                        Додати існуючу <IcoPlus/>
                    </PrimaryButton>
                </div>
            }
            contentForModal={
                <ContentWithSearch
                    search={searchCharacteristicsTitle}
                    handleSearch={(e) => setSearchCharacteristicsTitle(e.target.value)}
                    content={mutatedCharacteristicsTitle.map(characteristic => ({
                        value: characteristic.title,
                        id: characteristic.characteristicId
                    }))}
                    loading={characteristicsTitle.loading}
                    onClickValue={handleSelectCharacteristicTitle}
                />
            }
            isOpenModal={isOpenPopupCharacteristicsTitle}
            setIsOpenModal={setIsOpenPopupCharacteristicsTitle}
        />
    );
};

export default AddCharacteristicsTitle;