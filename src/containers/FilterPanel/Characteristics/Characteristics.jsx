import React from 'react';
import {v4 as uuidv4} from 'uuid';

const Characteristics = ({characteristics, setSelectedCharacteristics, selectedCharacteristics}) => {
    const characteristicsJSX = characteristics.map(characteristic => {
        const characteristicName = characteristic.characteristicName;
        const options = characteristic.options.map(option => {
            return (
                <label
                    key={uuidv4()}
                    style={{ marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => setSelectedCharacteristics([...selectedCharacteristics, option.option])}
                >
                    <input
                        type='checkbox'
                        value={option.option}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedCharacteristics([...selectedCharacteristics, option.option]);
                            } else {
                                setSelectedCharacteristics(selectedCharacteristics.filter(item => item !== option.option));
                            }
                        }}
                        checked={selectedCharacteristics.includes(option.option)} // Установка состояния checked
                    />
                    {option.option}
                </label>
            );
        });

        return <div style={{marginTop: '20px'}}>
            {characteristicName}
            {options}
        </div>
    })

    return (
        <div>
            {characteristicsJSX}
        </div>
    );
};

export default Characteristics;