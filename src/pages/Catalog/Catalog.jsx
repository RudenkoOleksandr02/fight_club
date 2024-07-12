import React, { useEffect, useState } from 'react';
import classes from './Catalog.module.css';
import Breadcrumbs from "../../ui/components/Breadcrumbs/Breadcrumbs";
import FilterPanel from "./FilterPanel/FilterPanel";
import TopPanel from "./TopPanel/TopPanel";
import CardListContainer from "../../containers/CardListContainer/CardListContainer";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByFilter } from "../../store/productSlice";

const Catalog = () => {
    const productsData = useSelector(state => state.productData.catalog);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const amount = 15;

    useEffect(() => {
        dispatch(getProductsByFilter({
            categoryName: "",
            sortBy: "string",
            amount: amount,
            start: (currentPage - 1) * amount,
            minPrice: 0,
            maxPrice: 0,
            selectedCharacteristics: []
        }));
    }, [currentPage, dispatch]);

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
                    <FilterPanel />
                    <TopPanel
                        totalCount={productsData.totalCount}
                        currentPage={currentPage}
                        amount={amount}
                        handleChangePage={handleChangePage}
                    />
                    <CardListContainer productsData={productsData} />
                </div>
            </div>
        </section>
    );
};

export default Catalog;
