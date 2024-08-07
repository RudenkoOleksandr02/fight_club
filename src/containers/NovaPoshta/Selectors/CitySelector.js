import React, { useState } from 'react';
import { fetchCities } from '../fetchs/fetchCities';
import InputSelect from '../../../ui/components/inputs/InputSelect/InputSelect';

const CitySelector = ({ setCity, errorsCity }) => {
    const [cities, setCities] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleInputChange = async (e) => {
        const text = e.target.value;
        setSearchText(text);
        if (text.length > 2) {
            const results = await fetchCities(text);
            setCities(results);
        }
    };

    const handleOptionClick = (option) => {
        const selectedCity = cities.find(city => city.name === option);
        setCity(selectedCity);
        setSearchText(option);
    };

    return (
        <div>
            <InputSelect
                placeholder="Город*"
                value={searchText}
                onInputChange={handleInputChange}
                onOptionClick={handleOptionClick}
                options={cities.map(city => city.name)}
                errors={errorsCity}
            />
        </div>
    );
};

export default CitySelector;
