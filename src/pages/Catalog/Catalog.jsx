import React, {useEffect, useState} from 'react';
import classes from './Catalog.module.css'
import Breadcrumbs from "../../ui/components/Breadcrumbs/Breadcrumbs";
import FilterPanel from "./FilterPanel/FilterPanel";
import TopPanel from "./TopPanel/TopPanel";
import CardListContainer from "../../containers/CardListContainer/CardListContainer";
import {useDispatch, useSelector} from "react-redux";
import {getProductsData} from "../../store/productsSlice";

const Catalog = () => {
    const productsData = useSelector(state => state.productsData.data);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(productsData.star);

    useEffect(() => {
        dispatch(getProductsData({
            categories: [

            ],
            sortBy: "string",
            amount: 15,
            star: currentPage,
            minPrice: 0,
            maxPrice: 1000,
            search: null
        }))
    }, [currentPage]);

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <section>
            <div className={classes.wrapper}>
                {/*<Breadcrumbs links={[]}/>*/}
                <div className={classes.main}>
                    <FilterPanel/>
                    <TopPanel
                        totalPages={productsData.totalPages}
                        currentPage={productsData.currentPage}
                        amount={productsData.amount}
                        handleChangePage={handleChangePage}
                    />
                    <CardListContainer products={productsData}/>
                </div>
            </div>
        </section>
    );
};

export default Catalog;