import React, {useEffect} from 'react';
import classes from './FilterPanel.module.css'
import {v4 as uuidv4} from 'uuid'
import {useDispatch, useSelector} from "react-redux";
import {getFilterPanelDataByCategoryName} from "../../store/filterPanelSlice";

const FilterPanel = ({setCategoryName, setSelectedCharacteristics, selectedCharacteristics, setMinMaxPrice}) => {
    const filterPanelData = useSelector(state => state.filterPanelData.filterPanelData);
    const dispatch = useDispatch();

    let categories;
    let characteristics;
    let price;
    if (filterPanelData) {
        categories = filterPanelData.categories.children.map(category => {
            const categoryName = category.name;
            const subcategory = category.children.map(subcategory => {
                return subcategory.name
            })
            return <div>
                <span
                    style={{cursor: 'pointer'}}
                    onClick={() => setCategoryName(categoryName)}
                >
                    {categoryName}
                </span>
                <div>{subcategory.map(el => {
                    return <div
                        style={{marginLeft: '20px', cursor: 'pointer'}}
                        onClick={() => setCategoryName(el)}
                    >
                        {el}
                    </div>
                })}</div>
            </div>
        })
        characteristics = filterPanelData.characteristics.map(characteristic => {
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

    }

    useEffect(() => {
        dispatch(getFilterPanelDataByCategoryName('Макіяж'))
    }, [])
    return (
        <div className={classes.wrapper}>
            <div>
                <h3>Під категорії</h3>
                {categories}
                {characteristics}
            </div>
        </div>
    );
};

export default FilterPanel;