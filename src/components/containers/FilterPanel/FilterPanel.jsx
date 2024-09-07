import React from 'react';
import classes from './FilterPanel.module.css';
import PrimaryButton from "../../ui/Buttons/PrimaryButton/PrimaryButton";
import CloseBtn from "../../ui/Buttons/CloseBtn/CloseBtn";
import MinMaxPrice from "../../ui/forFilters/MinMaxPrice/MinMaxPrice";
import Characteristics from "../../ui/forFilters/Characteristics/Characteristics";
import Categories from "../../ui/forFilters/Categories/Categories";

const FilterPanel = ({
                         handleApplyFilter,
                         onCloseFilterPanelInMobile,
                         forCategories: {setCategoryIds, categoryIds, categories},
                         forCharacteristics: {setCharacteristicIds, characteristicIds, characteristics},
                         forMinPrice: {minPrice, setMinPrice},
                         forMaxPrice: {maxPrice, setMaxPrice}

                     }) => {
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
                <Categories
                    categories={categories}
                    setCategoryIds={setCategoryIds}
                    categoryIds={categoryIds}
                    isOpen={true}
                    modificationStyle={{
                        color: 'primary',
                        fontSize1: '20px',
                        fontSize2: '18px',
                        fontWeight1: '500',
                        fontWeight2: '400'

                    }}
                />
                <Characteristics
                    characteristics={characteristics}
                    setCharacteristicIds={setCharacteristicIds}
                    characteristicIds={characteristicIds}
                    isOpen={true}
                    modificationStyle={{
                        color: 'primary',
                        fontSize1: '20px',
                        fontSize2: '18px',
                        fontWeight1: '500',
                        fontWeight2: '400'

                    }}
                />
                <MinMaxPrice
                    minPrice={minPrice || 0}
                    maxPrice={maxPrice || 0}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                />
                <div className={classes.buttonWrapper}>
                    <PrimaryButton onClick={handleApplyFilter}>Застосувати</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
