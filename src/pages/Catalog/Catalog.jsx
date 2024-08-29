import React, {useEffect, useState} from 'react';
import classes from './Catalog.module.css';
import FilterPanel from "./FilterPanel/FilterPanel";
import TopPanel from "./TopPanel/TopPanel";
import CardListContainer from "../../components/containers/CardListContainer/CardListContainer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import useBodyOverflowHidden from "../../common/hooks/useBodyOverflowHidden";
import {getFilterPanelById, getProductsByFilter} from "../../store/catalogPageSlice";
import Preloader from "../../components/ui/Preloader/Preloader";

const Catalog = () => {
    const {data: catalogData, loading: catalogLoading} = useSelector(state => state.catalogPage.catalog);
    const {loading: filterPanelLoading} = useSelector(state => state.catalogPage.filterPanel);
    const dispatch = useDispatch();
    const {id: categoryId} = useParams();
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

    // FILTER PANEL
    useEffect(() => {
        dispatch(getFilterPanelById(categoryId));
        setSelectedCharacteristics([]);
    }, [categoryId]);

    if (catalogLoading || filterPanelLoading) {
        return <Preloader color='secondary' cover={true}/>
    }
    if (!catalogData.totalCount) {
        return <div>error</div>
    }

    return (
        <section>
            <div className={classes.wrapper}>
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
                        totalCount={catalogData.totalCount}
                        currentPage={currentPage}
                        amount={amount}
                        handleChangePage={handleChangePage}
                        setSortBy={setSortBy}
                        onOpenFilterPanelInMobile={() => setIsVisibleFilterPanelInMobile(true)}
                    />
                    <CardListContainer productsData={catalogData}/>
                </div>
            </div>
        </section>
    );
};

export default Catalog;
