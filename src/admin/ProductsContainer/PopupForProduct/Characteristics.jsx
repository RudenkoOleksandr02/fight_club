import React, {useEffect, useState} from 'react';
import classes from "./PopupForProduct.module.css";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import SearchPopup from "../../SearchPopup/SearchPopup";
import Table from "../../Table/Table";
import Tr from "../../Table/Tr";
import Td from "../../Table/Td";
import IcoButton from "../../buttons/IcoButton/IcoButton";
import {ReactComponent as IcoPlus} from './../../images/icoPlus.svg';
import {ReactComponent as IcoDelete} from './../../images/icoDelete.svg';
import {useDispatch, useSelector} from "react-redux";
import {getCharacteristicSearch, getCharacteristicValues} from "../../../store/adminSlice";
import {v4 as uuidv4} from 'uuid';

const Characteristics = ({productData, setProductData}) => {
    const dispatch = useDispatch();
    const {characteristicsValues, characteristicsOptions} = useSelector(state => state.admin);

    const [isOpenPopupCharacteristicsTitle, setIsOpenPopupCharacteristicsTitle] = useState(false);
    const [searchCharacteristicsTitle, setSearchCharacteristicsTitle] = useState('');

    const [characteristics, setCharacteristics] = useState([]);
    const [currentCharacteristicId, setCurrentCharacteristicId] = useState(null);

    useEffect(() => {
        if (Array.isArray(productData?.characteristics)) {
            setCharacteristics(productData.characteristics.map(characteristic => ({
                characteristicId: characteristic?.characteristicId,
                title: characteristic?.title,
                desc: characteristic?.desc
            })));
        }
    }, [productData]);

    const handleSelectCharacteristicTitle = (value) => {
        setCharacteristics(prevState => [...prevState, {title: value}]);
    };

    useEffect(() => {
        dispatch(getCharacteristicSearch(searchCharacteristicsTitle));
    }, [searchCharacteristicsTitle, dispatch]);

    const [isOpenPopupCharacteristicsDesc, setIsOpenPopupCharacteristicsDesc] = useState(false);
    const [searchCharacteristicsDesc, setSearchCharacteristicsDesc] = useState('');

    const handleSelectCharacteristicDesc = (desc) => {
        const selectedOption = characteristicsOptions.data.find(option => option.desc === desc);

        if (selectedOption) {
            const {id} = selectedOption;
            setCharacteristics(prevState => prevState.map(characteristic => {
                if (characteristic.characteristicId === currentCharacteristicId) {
                    return {
                        ...characteristic,
                        desc,
                        characteristicId: id
                    };
                }
                return characteristic;
            }));
            setProductData(prevState => ({
                ...prevState,
                characteristics: characteristics.map(char => char.characteristicId === currentCharacteristicId
                    ? {...char, desc, characteristicId: id}
                    : char)
            }));
        }

        setIsOpenPopupCharacteristicsDesc(false);
    };

    const handleClickCharacteristicDesc = (title, id) => {
        setCurrentCharacteristicId(id);
        dispatch(getCharacteristicValues(title));
        setIsOpenPopupCharacteristicsDesc(true);
    };
    const handleDellCharacteristics = (characteristicId) => {
        const updatedCharacteristics = characteristics.filter(characteristic => characteristic.characteristicId !== characteristicId);
        setCharacteristics(updatedCharacteristics);
        setProductData(prevState => ({
            ...prevState, characteristics: updatedCharacteristics
        }));
    };

    return (
        <div className={classes.characteristicsWrapper + ' ' + classes.die}>
            <span>Характеристики</span>
            <div className={classes.inner}>
                <div className={classes.btns}>
                    <PrimaryButton handleClick={() => setIsOpenPopupCharacteristicsTitle(true)}>Додати
                        існуючу <IcoPlus/></PrimaryButton>
                </div>
                {isOpenPopupCharacteristicsTitle && (
                    <SearchPopup
                        onClosePopup={setIsOpenPopupCharacteristicsTitle}
                        search={searchCharacteristicsTitle}
                        handleSearch={(e) => setSearchCharacteristicsTitle(e.target.value)}
                        content={characteristicsValues.data}
                        loading={characteristicsValues.loading}
                        onClickValue={handleSelectCharacteristicTitle}
                    />
                )}
                <Table>
                    {characteristics.map((characteristic) => (
                        <Tr key={uuidv4()} templateColumns='360px 1fr 44px'>
                            <Td justifyContent='left'>{characteristic.title}</Td>
                            <Td justifyContent='left'>
                                <SelectedOption
                                    option={characteristic.desc}
                                    handleClick={() => handleClickCharacteristicDesc(characteristic.title, characteristic.characteristicId)}
                                />
                            </Td>
                            <Td>
                                <IcoButton svgIco={<IcoDelete/>}
                                           onClick={() => handleDellCharacteristics(characteristic.characteristicId)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Table>
                {isOpenPopupCharacteristicsDesc && (
                    <SearchPopup
                        onClosePopup={setIsOpenPopupCharacteristicsDesc}
                        search={searchCharacteristicsDesc}
                        handleSearch={(e) => setSearchCharacteristicsDesc(e.target.value)}
                        content={characteristicsOptions.data.map(data => data.desc)}
                        loading={characteristicsOptions.loading}
                        onClickValue={handleSelectCharacteristicDesc}
                    />
                )}
            </div>
        </div>
    );
};

export default Characteristics;

const SelectedOption = ({option, handleClick}) => {
    return (
        <div onClick={handleClick} className={classes.selectedOption}>
            {!option ? <p>Опис характеристики</p> : <p>{option}</p>}
        </div>
    );
};
