import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAdminOrderFilterPanel} from "../../../../store/adminSlices/adminOrderSlice";
import classes from "./FilterPanel.module.css";
import MinMaxPrice from "../../../../components/ui/forFilters/MinMaxPrice/MinMaxPrice";
import PrimaryButton from "../../../buttons/PrimaryButton/PrimaryButton";
import Checkbox from "../../../../components/ui/inputs/Checkbox/Checkbox";

const FilterPanel = ({
                         statusIds,
                         setStatusIds,
                         minOrderDate,
                         setMinOrderDate,
                         maxOrderDate,
                         setMaxOrderDate,
                         minPrice,
                         setMinPrice,
                         maxPrice,
                         setMaxPrice
                     }) => {
    const {adminFilterPanel} = useSelector(state => state.admin.adminOrder)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminOrderFilterPanel())
    }, [])
    useEffect(() => {
        setMinPrice(adminFilterPanel.data.minTotalPrice)
        setMaxPrice(adminFilterPanel.data.maxTotalPrice)
    }, [adminFilterPanel.data.minTotalPrice, adminFilterPanel.data.maxTotalPrice])
    useEffect(() => {
        const minDate = adminFilterPanel.data.minOrderDate
            ? adminFilterPanel.data.minOrderDate.slice(0, 10)
            : null;
        const maxDate = adminFilterPanel.data.maxOrderDate
            ? adminFilterPanel.data.maxOrderDate.slice(0, 10)
            : null;
        setMinOrderDate(minDate);
        setMaxOrderDate(maxDate);
    }, [adminFilterPanel.data.minOrderDate, adminFilterPanel.data.maxOrderDate]);

    const handleReset = () => {
        setStatusIds([]);
        setMinOrderDate(adminFilterPanel.data.minOrderDate ? adminFilterPanel.data.minOrderDate.slice(0, 10) : null);
        setMaxOrderDate(adminFilterPanel.data.maxOrderDate ? adminFilterPanel.data.maxOrderDate.slice(0, 10) : null);
        setMinPrice(adminFilterPanel.data.minTotalPrice);
        setMaxPrice(adminFilterPanel.data.maxTotalPrice);
    };

    if (adminFilterPanel.loading) return null

    return (
        <div className={classes.wrapper}>
            <div className={classes.status}>
                <h3>Статус</h3>
                {adminFilterPanel.data.statusOptions.map(option => (
                    <Checkbox
                        key={option.status}
                        style='_'
                        text={option.statusName}
                        onChange={() => {
                            if (statusIds.some((id) => id === option.status)) {
                                setStatusIds(prevStatusIds => prevStatusIds.filter(statusId => statusId !== option.status))
                            } else {
                                setStatusIds(prevStatusIds => [...prevStatusIds, option.status]);
                            }
                        }}
                        checked={statusIds.some((id) => id === option.status)}
                    />
                ))}
            </div>
            <div className={classes.dateContainer}>
                <div className={classes.date}>
                    <span>Від</span>
                    <input
                        type='date'
                        value={minOrderDate || ''}
                        onChange={e => setMinOrderDate(e.target.value)}
                    />
                </div>
                <div className={classes.date}>
                    <span>До</span>
                    <input
                        type='date'
                        value={maxOrderDate || ''}
                        onChange={e => setMaxOrderDate(e.target.value)}
                    />
                </div>
            </div>
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