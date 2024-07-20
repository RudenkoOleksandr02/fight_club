import React, {useEffect, useState} from 'react';
import classes from './Catalog.module.css';
import Breadcrumbs from "../../ui/components/Breadcrumbs/Breadcrumbs";
import FilterPanel from "./../../containers/FilterPanel/FilterPanel";
import TopPanel from "./TopPanel/TopPanel";
import CardListContainer from "../../containers/CardListContainer/CardListContainer";
import {useDispatch, useSelector} from "react-redux";
import {getProductsByFilter} from "../../store/productSlice";
import {useParams} from "react-router-dom";
import useBodyOverflowHidden from "../../common/hooks/useBodyOverflowHidden/useBodyOverflowHidden";

const Catalog = () => {
    const {id: categoryId} = useParams();
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
    const [isVisibleFilterPanelInMobile, setIsVisibleFilterPanelInMobile] = useState(false);
    useBodyOverflowHidden(isVisibleFilterPanelInMobile)
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
                    <div className={`${classes.filterPanel} ${isVisibleFilterPanelInMobile ? classes.visible : ''}`}>
                        <FilterPanel
                            categoryId={categoryId}
                            setSelectedCharacteristics={setSelectedCharacteristics}
                            selectedCharacteristics={selectedCharacteristics}
                            minMaxPrice={minMaxPrice}
                            setMinMaxPrice={setMinMaxPrice}
                            handleApplyFilter={handleApplyFilter}
                            onCloseFilterPanelInMobile={() => setIsVisibleFilterPanelInMobile(false)}
                        />
                    </div>
                    <TopPanel
                        totalCount={productsData.totalCount}
                        currentPage={currentPage}
                        amount={amount}
                        handleChangePage={handleChangePage}
                        setSortBy={setSortBy}
                        onOpenFilterPanelInMobile={() => setIsVisibleFilterPanelInMobile(true)}
                    />
                    <CardListContainer productsData={productsData}/>
                </div>
            </div>
        </section>
    );
};

export default Catalog;
