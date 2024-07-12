import React, {useEffect, useState} from 'react';
import classes from './FilterPanel.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getFilterPanelDataByCategoryName} from "../../store/filterPanelSlice";
import PrimaryButton from "../../ui/components/Buttons/PrimaryButton/PrimaryButton";
import Categories from "./Categories/Categories";
import Characteristics from "./Characteristics/Characteristics";
import MinMaxPrice from "./MinMaxPrice/MinMaxPrice";

const FilterPanel = ({
                         setCategoryName,
                         setSelectedCharacteristics,
                         selectedCharacteristics,
                         minMaxPrice,
                         setMinMaxPrice,
                         handleApplyFilter
                     }) => {
    const filterPanelData = useSelector(state => state.filterPanelData.filterPanelData);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState('Макіяж');

    useEffect(() => {
        dispatch(getFilterPanelDataByCategoryName(selectedCategory));
    }, [selectedCategory])

    const handleChangeCategory = (name) => {
        setSelectedCategory(name);
        setCategoryName(name)
    }
    if (!filterPanelData) {
        return <div>
            ...preloader
        </div>
    }
    return (
        <div className={classes.wrapper}>
            <div>
                <h3>Під категорії</h3>
                <Categories
                    categories={filterPanelData.categories}
                    handleChangeCategory={handleChangeCategory}
                />
                <h3>Характеристики</h3>
                <Characteristics
                    characteristics={filterPanelData.characteristics}
                    setSelectedCharacteristics={setSelectedCharacteristics}
                    selectedCharacteristics={selectedCharacteristics}
                />
                <MinMaxPrice
                    minPrice={filterPanelData.minPrice}
                    maxPrice={filterPanelData.maxPrice}
                    minMaxPrice={minMaxPrice}
                    setMinMaxPrice={setMinMaxPrice}
                />
                <PrimaryButton onClick={handleApplyFilter}>Застосувати</PrimaryButton>
            </div>
        </div>
    );
};

export default FilterPanel;