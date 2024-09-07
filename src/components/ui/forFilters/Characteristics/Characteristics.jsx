import React, {useEffect, useState} from 'react';
import classes from "./Characteristics.module.css";
import Folding from "../../Buttons/Folding/Folding";
import Checkbox from "../../inputs/Checkbox/Checkbox";

const Characteristics = ({
                             characteristics,
                             setCharacteristicIds,
                             characteristicIds,
                             isOpen = false,
                             modificationStyle = {
                                 color: '_',
                                 fontSize1: '20px',
                                 fontSize2: '18px',
                                 fontWeight1: '500',
                                 fontWeight2: '400'
                             }
                         }) => {
    const [localCharacteristics, setLocalCharacteristics] = useState([]);
    const [isOpenCharacteristics, setIsOpenCharacteristics] = useState(isOpen);
    const [isOpenCharacteristic, setIsOpenCharacteristic] = useState({});

    useEffect(() => {
        setLocalCharacteristics(characteristics);
    }, [characteristics]);

    const handleChangeCharacteristic = (e, optionId) => {
        if (e.target.checked) {
            setCharacteristicIds(prevIds => [...prevIds, optionId]);
        } else {
            setCharacteristicIds(prevIds => prevIds.filter(id => id !== optionId));
        }
    };

    const handleToggleCharacteristic = (characteristicName) => {
        setIsOpenCharacteristic(prevState => ({
            ...prevState,
            [characteristicName]: !prevState[characteristicName]
        }));
    };

    return (
        <div className={classes.characteristics}>
            <Folding
                isOpen={isOpenCharacteristics}
                handleClick={() => setIsOpenCharacteristics(prevState => !prevState)}
                contentBtn='Характеристики'
                modificationStyleBtn={{
                    color: modificationStyle.color,
                    fontSize: modificationStyle.fontSize1,
                    fontWeight: modificationStyle.fontWeight1
                }}
                contentDropdown={localCharacteristics.map(characteristic => (
                    <Folding
                        key={characteristic.characteristicName}
                        isOpen={isOpenCharacteristic[characteristic.characteristicName]}
                        handleClick={() => handleToggleCharacteristic(characteristic.characteristicName)}
                        contentBtn={characteristic.characteristicName}
                        modificationStyleBtn={{
                            color: modificationStyle.color,
                            fontSize: modificationStyle.fontSize2,
                            fontWeight: modificationStyle.fontWeight2
                        }}
                        contentDropdown={characteristic.options.map(option => (
                            <div className={classes.option} key={option.id}>
                                <Checkbox
                                    checked={characteristicIds.includes(option.id)}
                                    onChange={e => handleChangeCharacteristic(e, option.id)}
                                    style='_'
                                    text={`${option.option} (${option.productsAmount})`}
                                />
                            </div>
                        ))}
                    />
                ))}
            />
        </div>
    );
};

export default Characteristics;