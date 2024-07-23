import React, { useState, useEffect } from 'react';
import { fetchDepartments } from '../fetchs/fetchDepartments';
import InputSelect from '../../../ui/components/InputSelect/InputSelect';

const DepartmentSelector = ({ cityRef }) => {
    const [departments, setDepartments] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchDeps = async () => {
            if (cityRef) {
                const results = await fetchDepartments(cityRef, searchText);
                setDepartments(results);
            }
        };
        fetchDeps();
    }, [cityRef, searchText]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleOptionClick = (option) => {
        setSearchText(option);
    };

    return (
        <div>
            <InputSelect
                placeholder="Відділення"
                value={searchText}
                onInputChange={handleInputChange}
                onOptionClick={handleOptionClick}
                options={departments}
                disabled={cityRef === null}
            />
        </div>
    );
};

export default DepartmentSelector;
