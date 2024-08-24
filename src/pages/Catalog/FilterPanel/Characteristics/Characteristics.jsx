import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './Characteristics.module.css'

const Characteristics = ({ characteristics, setSelectedCharacteristics, selectedCharacteristics }) => {
    const handleCharacteristicChange = (optionId) => {
        if (selectedCharacteristics.includes(optionId)) {
            setSelectedCharacteristics(selectedCharacteristics.filter(item => item !== optionId));
        } else {
            setSelectedCharacteristics([...selectedCharacteristics, optionId]);
        }
    };

    const characteristicsJSX = characteristics.map((characteristic) => {
        const characteristicName = characteristic.characteristicName;
        const options = characteristic.options.map((option) => (
            <label
                key={uuidv4()}
                className={classes.option}
            >
                <input
                    type="checkbox"
                    value={option.id}
                    onChange={() => handleCharacteristicChange(option.id)}
                    checked={selectedCharacteristics.includes(option.id)}
                />
                {option.option}
            </label>
        ));

        return (
            <div key={uuidv4()}>
                <h4 className={classes.characteristicName}>{characteristicName}</h4>
                {options}
            </div>
        );
    });

    return <div className={classes.wrapper}>{characteristicsJSX}</div>;
};

export default Characteristics;
