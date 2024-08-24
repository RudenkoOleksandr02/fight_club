import React, {useEffect, useState} from 'react';
import classes from './FilterPanel.module.css';
import {useDispatch, useSelector} from "react-redux";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import Categories from "./Categories/Categories";
import Characteristics from "./Characteristics/Characteristics";
import MinMaxPrice from "./MinMaxPrice/MinMaxPrice";
import CloseBtn from "../../../components/ui/Buttons/CloseBtn/CloseBtn";
import {getFilterPanelById} from "../../../store/catalogPageSlice";

const FilterPanel = ({
                         categoryId,
                         setSelectedCharacteristics,
                         selectedCharacteristics,
                         minMaxPrice,
                         setMinMaxPrice,
                         handleApplyFilter,
                         onCloseFilterPanelInMobile
                     }) => {
    const {data: filterPanelData} = useSelector(state => state.catalogPage.filterPanel);

    useEffect(() => {
        if (filterPanelData) {
            setMinMaxPrice({
                minPrice: filterPanelData.minPrice,
                maxPrice: filterPanelData.maxPrice
            });
        }
    }, [filterPanelData]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.mobileExhibition}>
                <h3>Фільтри</h3>
                <CloseBtn
                    setIsOpen={onCloseFilterPanelInMobile}
                    styles={{width1: '40px', width2: '40px', color: 'black', height: '40px'}}
                />
            </div>
            <div className={classes.inner}>
                {
                    filterPanelData.length !== 0 && filterPanelData.categories.children.length !== 0 &&
                    <>
                        <h3 className={classes}>Під категорії</h3>
                        <Categories
                            categories={filterPanelData.categories}
                        />
                    </>
                }
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
                <div className={classes.buttonWrapper}>
                    <PrimaryButton onClick={handleApplyFilter}>Застосувати</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
