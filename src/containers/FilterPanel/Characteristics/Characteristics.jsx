import React from 'react';
import { v4 as uuidv4 } from 'uuid';

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
                key={option.id}
                style={{ marginLeft: '20px', cursor: 'pointer' }}
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
            <div key={uuidv4()} style={{ marginTop: '20px' }}>
                {characteristicName}
                {options}
            </div>
        );
    });

    return <div>{characteristicsJSX}</div>;
};

export default Characteristics;
