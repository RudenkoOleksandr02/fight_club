import React, {useEffect, useState} from 'react';
import classes from './ContentForLeftPanel.module.css';
import {ReactComponent as IcoArrow} from './../../images/icoArrow.svg';
import {useDispatch} from "react-redux";
import {getAdminFilterPanel} from "../../../store/adminSlice";

const ContentForLeftPanel = ({
                                 setCategoryIds,
                                 categoryIds,
                                 setCharacteristicIds,
                                 characteristicIds,
                                 adminFilterPanel,
                                 minPrice,
                                 setMinPrice,
                                 maxPrice,
                                 setMaxPrice
                             }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminFilterPanel());
    }, [dispatch]);

    // CATEGORIES
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(adminFilterPanel.data.categories);
    }, [adminFilterPanel]);

    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [isOpenParentCategories, setIsOpenParentCategories] = useState({});

    const handleChangeCategory = (e, categoryId) => {
        if (e.target.checked) {
            setCategoryIds(prevIds => [...prevIds, categoryId]);
        } else {
            setCategoryIds(prevIds => prevIds.filter(id => id !== categoryId));
        }
    };

    const handleClickParentCategory = (categoryId) => {
        setIsOpenParentCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    const categoriesJSX = (
        <div className={classes.inner}>
            <div className={classes.folding} onClick={() => setIsOpenCategories(prevState => !prevState)}>
                <span className={classes.title}>Категорії</span>
                <span className={`${classes.ico} ${isOpenCategories ? classes.isOpen : ''}`}>
                    <IcoArrow/>
                </span>
            </div>
            {isOpenCategories && (
                <div className={classes.parentCategories}>
                    {categories.map(parentCategory => (
                        <React.Fragment key={parentCategory.categoryId}>
                            <div className={classes.wrappFolding}>
                                <input
                                    type='checkbox'
                                    name='checkbox'
                                    checked={categoryIds.includes(parentCategory.categoryId)}
                                    onChange={e => handleChangeCategory(e, parentCategory.categoryId)}
                                />
                                <div
                                    className={classes.folding}
                                    onClick={() => handleClickParentCategory(parentCategory.categoryId)}
                                >
                                    <span className={classes.title}>{parentCategory.name}</span>
                                    <span
                                        className={`${classes.ico} ${isOpenParentCategories[parentCategory.categoryId] ? classes.isOpen : ''}`}
                                    >
                                        <IcoArrow/>
                                    </span>
                                </div>
                            </div>
                            {isOpenParentCategories[parentCategory.categoryId] && (
                                <div className={classes.childrenCategories}>
                                    {parentCategory.children?.map(category => (
                                        <div key={category.categoryId}>
                                            <input
                                                type='checkbox'
                                                name='checkbox'
                                                checked={categoryIds.includes(category.categoryId)}
                                                onChange={e => handleChangeCategory(e, category.categoryId)}
                                            />
                                            <span>{category.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );

    // CHARACTERISTICS
    const [characteristics, setCharacteristics] = useState([]);
    const [isOpenCharacteristics, setIsOpenCharacteristics] = useState(false);
    const [isOpenCharacteristic, setIsOpenCharacteristic] = useState({});

    useEffect(() => {
        setCharacteristics(adminFilterPanel.data.characteristics);
    }, [adminFilterPanel]);

    const handleChangeCharacteristic = (e, optionId) => {
        if (e.target.checked) {
            setCharacteristicIds(prevIds => [...prevIds, optionId]);
        } else {
            setCharacteristicIds(prevIds => prevIds.filter(id => id !== optionId));
        }
    };

    const handleToggleCharacteristic = (characteristicName) => {
        setIsOpenCharacteristic(prevState => ({
            ...prevState,
            [characteristicName]: !prevState[characteristicName]
        }));
    };

    const characteristicsJSX = (
        <div className={classes.inner}>
            <div className={classes.folding} onClick={() => setIsOpenCharacteristics(prevState => !prevState)}>
                <span className={classes.title}>Характеристики</span>
                <span className={`${classes.ico} ${isOpenCharacteristics ? classes.isOpen : ''}`}>
                    <IcoArrow/>
                </span>
            </div>
            {isOpenCharacteristics && (
                <div className={classes.characteristics}>
                    {characteristics.map(characteristic => (
                        <React.Fragment key={characteristic.characteristicName}>
                            <div className={classes.wrappFolding}>
                                <div
                                    className={classes.folding}
                                    onClick={() => handleToggleCharacteristic(characteristic.characteristicName)}
                                >
                                    <span className={classes.title}>{characteristic.characteristicName}</span>
                                    <span
                                        className={`${classes.ico} ${isOpenCharacteristic[characteristic.characteristicName] ? classes.isOpen : ''}`}
                                    >
                                        <IcoArrow/>
                                    </span>
                                </div>
                            </div>
                            {isOpenCharacteristic[characteristic.characteristicName] && (
                                <div className={classes.options}>
                                    {characteristic.options.map(option => (
                                        <div key={option.id} className={classes.option}>
                                            <input
                                                type='checkbox'
                                                name='checkbox'
                                                checked={characteristicIds.includes(option.id)}
                                                onChange={e => handleChangeCharacteristic(e, option.id)}
                                            />
                                            <span>{option.option} ({option.productsAmount})</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );

    // MIN PRICE / MAX PRICE
    const [initialMinPriceValue, setInitialMinPriceValue] = useState(0);
    const [initialMaxPriceValue, setInitialMaxPriceValue] = useState(0);

    const [minPriceValue, setMinPriceValue] = useState(0);
    const [maxPriceValue, setMaxPriceValue] = useState(0);

    useEffect(() => {
        const minPrice = Math.floor(adminFilterPanel.data.minPrice);
        const maxPrice = Math.ceil(adminFilterPanel.data.maxPrice);

        setInitialMinPriceValue(minPrice);
        setInitialMaxPriceValue(maxPrice);
        setMinPriceValue(minPrice);
        setMaxPriceValue(maxPrice);
    }, [adminFilterPanel]);

    const handleChangeMinPrice = (e) => {
        const value = Number(e.target.value);
        if (value >= initialMinPriceValue && value <= maxPriceValue) {
            setMinPriceValue(value);
            setMinPrice(value); // Обновление состояния в ProductsContainer
        } else if (value < initialMinPriceValue) {
            setMinPriceValue(initialMinPriceValue);
            setMinPrice(initialMinPriceValue);
        } else if (value > maxPriceValue) {
            setMinPriceValue(maxPriceValue);
            setMinPrice(maxPriceValue);
        }
    };

    const handleChangeMaxPrice = (e) => {
        const value = Number(e.target.value);
        if (value <= initialMaxPriceValue && value >= minPriceValue) {
            setMaxPriceValue(value);
            setMaxPrice(value);
        } else if (value > initialMaxPriceValue) {
            setMaxPriceValue(initialMaxPriceValue);
            setMaxPrice(initialMaxPriceValue);
        } else if (value < minPriceValue) {
            setMaxPriceValue(minPriceValue);
            setMaxPrice(minPriceValue);
        }
    };

    const minPriceJSX = (
        <div className={classes.minMaxPrice}>
            <input
                type='number'
                value={minPriceValue}
                onChange={handleChangeMinPrice}
                min={initialMinPriceValue}
                max={initialMaxPriceValue}
            /><span>-</span>
            <input
                type='number'
                value={maxPriceValue}
                onChange={handleChangeMaxPrice}
                min={initialMinPriceValue}
                max={initialMaxPriceValue}
            />
        </div>
    );


    return (
        <div className={classes.wrapper}>
            {categoriesJSX}
            {characteristicsJSX}
            {minPriceJSX}
        </div>
    );
};

export default ContentForLeftPanel;
