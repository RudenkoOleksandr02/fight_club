import React, { useEffect, useState } from 'react';
import classes from './Catalog.module.css';
import Breadcrumbs from "../../ui/components/Breadcrumbs/Breadcrumbs";
import FilterPanel from "./../../containers/FilterPanel/FilterPanel";
import TopPanel from "./TopPanel/TopPanel";
import CardListContainer from "../../containers/CardListContainer/CardListContainer";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByFilter } from "../../store/productSlice";
import { useParams } from "react-router-dom";

const Catalog = () => {
    const { id: categoryId } = useParams();
    const productsData = useSelector(state => state.productData.catalog);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const amount = 15;
    const [sortBy, setSortBy] = useState("");
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const [minMaxPrice, setMinMaxPrice] = useState({
        minPrice: 0,
        maxPrice: 0
    });
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false); // Новое состояние для управления видимостью фильтров на мобильных устройствах

    const applyFilter = () => {
        dispatch(getProductsByFilter({
            categoryId: categoryId,
            sortBy: sortBy,
            amount: amount,
            start: (currentPage - 1) * amount,
            minPrice: minMaxPrice.minPrice,
            maxPrice: minMaxPrice.maxPrice,
            selectedCharacteristics: selectedCharacteristics
        }));
    };

    useEffect(() => {
        applyFilter();
    }, [categoryId, sortBy, currentPage, minMaxPrice.minPrice, minMaxPrice.maxPrice, selectedCharacteristics]);

    useEffect(() => {
        handleApplyFilter();
    }, [categoryId]);

    const handleApplyFilter = () => {
        setCurrentPage(1);
        applyFilter();
        setIsMobileFilterVisible(false); // Закрыть панель фильтров на мобильных после применения фильтров
    };

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!productsData) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <div className={classes.wrapper}>
                {/*<Breadcrumbs links={[]}/>*/}
                <div className={classes.main}>
                    <div className={`${classes.filterPanel} ${isMobileFilterVisible ? classes.visible : ''}`}>
                        <FilterPanel
                            categoryId={categoryId}
                            setSelectedCharacteristics={setSelectedCharacteristics}
                            selectedCharacteristics={selectedCharacteristics}
                            minMaxPrice={minMaxPrice}
                            setMinMaxPrice={setMinMaxPrice}
                            handleApplyFilter={handleApplyFilter}
                        />
                    </div>
                    <TopPanel
                        totalCount={productsData.totalCount}
                        currentPage={currentPage}
                        amount={amount}
                        handleChangePage={handleChangePage}
                        setSortBy={setSortBy}
                        onFilterButtonClick={() => setIsMobileFilterVisible(!isMobileFilterVisible)} // Управление видимостью панели фильтров
                    />
                    <CardListContainer productsData={productsData} />
                </div>
            </div>
        </section>
    );
};

export default Catalog;
