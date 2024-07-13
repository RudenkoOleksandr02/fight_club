import React, { useEffect, useState } from 'react';
import classes from './Catalog.module.css';
import Breadcrumbs from "../../ui/components/Breadcrumbs/Breadcrumbs";
import FilterPanel from "./../../containers/FilterPanel/FilterPanel";
import TopPanel from "./TopPanel/TopPanel";
import CardListContainer from "../../containers/CardListContainer/CardListContainer";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByFilter } from "../../store/productSlice";
import { getCategoryById } from "../../store/categorySlice";
import { useParams } from "react-router-dom";

const Catalog = () => {
    const { id: categoryId } = useParams();
    const productsData = useSelector(state => state.productData.catalog);
    const categoryData = useSelector(state => state.categoryData.categoryData);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const amount = 15;
    const [sortBy, setSortBy] = useState("");
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const [minMaxPrice, setMinMaxPrice] = useState({
        minPrice: 0,
        maxPrice: 0
    });

    const applyFilter = () => {
        dispatch(getProductsByFilter({
            categoryId: categoryId,
            sortBy: sortBy,
            amount: amount,
            start: currentPage * amount,
            minPrice: minMaxPrice.minPrice,
            maxPrice: minMaxPrice.maxPrice,
            selectedCharacteristics: selectedCharacteristics
        }));
    };

    useEffect(() => {
        dispatch(getCategoryById(categoryId));
        setSelectedCharacteristics([]); // Сброс характеристик при изменении категории
        setMinMaxPrice({ minPrice: 0, maxPrice: 0 }); // Сброс минимальной и максимальной цены
    }, [categoryId, dispatch]);

    useEffect(() => {
        applyFilter();
    }, [currentPage, categoryId, sortBy, minMaxPrice, selectedCharacteristics]);

    const handleApplyFilter = () => {
        applyFilter();
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
                    <FilterPanel
                        categoryId={categoryId}
                        setSelectedCharacteristics={setSelectedCharacteristics}
                        selectedCharacteristics={selectedCharacteristics}
                        minMaxPrice={minMaxPrice}
                        setMinMaxPrice={setMinMaxPrice}
                        handleApplyFilter={handleApplyFilter}
                    />
                    <TopPanel
                        totalCount={productsData.totalCount}
                        currentPage={currentPage}
                        amount={amount}
                        handleChangePage={handleChangePage}
                        setSortBy={setSortBy}
                    />
                    <CardListContainer productsData={productsData}/>
                </div>
            </div>
        </section>
    );
};

export default Catalog;
