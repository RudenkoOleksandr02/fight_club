import React, {useEffect} from 'react';
import classes from './FilterPanel.module.css';
import {useDispatch, useSelector} from "react-redux";
import Categories from "../../../../components/ui/forFilters/Categories/Categories";
import Characteristics from "../../../../components/ui/forFilters/Characteristics/Characteristics";
import AdditionalOptions from "./AdditionalOptions";
import {getAdminFilterPanel} from "../../../../store/adminSlices/adminProductSlice";
import MinMaxPrice from "../../../../components/ui/forFilters/MinMaxPrice/MinMaxPrice";
import PrimaryButton from "../../../buttons/PrimaryButton/PrimaryButton";

const FilterPanel = ({
                         categoryIds,
                         setCategoryIds,
                         characteristicIds,
                         setCharacteristicIds,
                         isShown,
                         setIsShown,
                         isHit,
                         setIsHit,
                         hasDiscount,
                         setHasDiscount,
                         setMinPrice,
                         minPrice,
                         setMaxPrice,
                         maxPrice,
                         isNew,
                         setIsNew
                     }) => {
    const {adminFilterPanel} = useSelector(state => state.admin.adminProduct)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdminFilterPanel());
    }, []);
    useEffect(() => {
        setMinPrice(adminFilterPanel.data.minPrice)
        setMaxPrice(adminFilterPanel.data.maxPrice)
    }, [adminFilterPanel.data.minPrice, adminFilterPanel.data.maxPrice]);
    const handleReset = () => {
        setCategoryIds([])
        setCharacteristicIds([])
        setIsShown(null)
        setIsHit(null)
        setHasDiscount(null)
        setIsNew(null)
        setMinPrice(adminFilterPanel.data.minPrice)
        setMaxPrice(adminFilterPanel.data.maxPrice)
    }

    if (adminFilterPanel.loading) return null

    return (
        <div className={classes.wrapper}>
            <Categories
                categories={adminFilterPanel.data.categories}
                setCategoryIds={setCategoryIds}
                categoryIds={categoryIds}
            />
            <Characteristics
                characteristics={adminFilterPanel.data.characteristics}
                setCharacteristicIds={setCharacteristicIds}
                characteristicIds={characteristicIds}
            />
            <AdditionalOptions
                isShown={isShown}
                setIsShown={setIsShown}
                isHit={isHit}
                setIsHit={setIsHit}
                hasDiscount={hasDiscount}
                setHasDiscount={setHasDiscount}
                isNew={isNew}
                setIsNew={setIsNew}
            />
            <div className={classes.minMaxPrice}>
                <MinMaxPrice
                    minPrice={minPrice || 0}
                    maxPrice={maxPrice || 0}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    modificationStyle={{width: '100%', color: '_'}}
                />
            </div>
            <div className={classes.reset}>
                <PrimaryButton handleClick={handleReset}>Скидання</PrimaryButton>
            </div>
        </div>
    );
};

export default FilterPanel;
