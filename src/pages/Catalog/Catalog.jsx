import React, {useEffect, useState, useCallback} from 'react';
import classes from './Catalog.module.css';
import FilterPanel from "../../components/containers/FilterPanel/FilterPanel";
import TopPanel from "../../components/ui/TopPanel/TopPanel";
import CardListContainer from "../../components/containers/CardListContainer/CardListContainer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import useBodyOverflowHidden from "../../common/hooks/useBodyOverflowHidden";
import {getFilterPanelById, getProductsByFilter} from "../../store/pageSlices/catalogPageSlice";
import Preloader from "../../components/ui/Preloader/Preloader";
import AbsenceBlock from "../../components/ui/blocks/AbsenceBlock/AbsenceBlock";

const Catalog = () => {
    const dispatch = useDispatch();
    const {id: categoryId} = useParams();

    const {data: catalogData, loading: catalogLoading} = useSelector(state => state.catalogPage.catalog);
    const {loading: filterPanelLoading, data: filterPanelData} = useSelector(state => state.catalogPage.filterPanel);

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [categoryIds, setCategoryIds] = useState([]);
    const [characteristicIds, setCharacteristicIds] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [isVisibleFilterPanelInMobile, setIsVisibleFilterPanelInMobile] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const amount = 15;

    useBodyOverflowHidden(isVisibleFilterPanelInMobile);

    // CHANGE CATEGORY ID
    useEffect(() => {
        setIsPageLoading(true);

        setCurrentPage(1);
        setSortBy("");
        setCategoryIds([]);
        setCharacteristicIds([]);
        setMinPrice(0);
        setMaxPrice(0);

        dispatch(getFilterPanelById(categoryId))
            .then(() => fetchProducts(1, [], [], filterPanelData.maxPrice, filterPanelData.minPrice, ""))
            .finally(() => setIsPageLoading(false))
    }, [categoryId]);

    // MIN MAX PRICE
    useEffect(() => {
        if (filterPanelData) {
            setMinPrice(filterPanelData.minPrice || 0);
            setMaxPrice(filterPanelData.maxPrice || 0);
        }
    }, [filterPanelData]);

    // LOAD PRODUCTS WITH FILTER AND SORT
    const fetchProducts = useCallback((
        actualCurrentPage = currentPage,
        actualCharacteristicIds = characteristicIds,
        actualCategoryIds = categoryIds,
        actualMaxPrice = maxPrice,
        actualMinPrice = minPrice,
        actualSortBy = sortBy
    ) => {
        dispatch(getProductsByFilter({
            categoryId,
            sortBy: actualSortBy,
            amount,
            start: (actualCurrentPage - 1) * amount,
            minPrice: actualMinPrice,
            maxPrice: actualMaxPrice,
            selectedCharacteristics: actualCharacteristicIds,
            categoryIds: actualCategoryIds
        }));
    }, [categoryId, amount, characteristicIds, categoryIds, minPrice, maxPrice, sortBy, currentPage]);

    // APPLY FILTER
    const handleApplyFilter = () => {
        setCurrentPage(1);
        fetchProducts(1);
    };

    // APPLY SORT AND CHANGE PAGE
    useEffect(() => {
        fetchProducts();
    }, [currentPage, sortBy]);
    console.log(filterPanelData?.categories?.children)
    if (isPageLoading) return <Preloader color='secondary' cover={true}/>

    return (
        <section>
            <div className={classes.wrapper}>
                {!catalogLoading && (!catalogData?.products?.length) ? (
                    <AbsenceBlock
                        title='Будь ласка, зайдіть пізніше.'
                        text='Товари у цій категорії тимчасово відсутні.'
                    />
                ) : (
                    <div className={classes.main}>
                        <div
                            className={`${classes.filterPanel} ${isVisibleFilterPanelInMobile ? classes.visible : ''}`}>
                            {filterPanelLoading ? <Preloader color='tertiary'/> : (
                                <FilterPanel
                                    handleApplyFilter={handleApplyFilter}
                                    onCloseFilterPanelInMobile={() => setIsVisibleFilterPanelInMobile(false)}
                                    forCategories={{
                                        setCategoryIds,
                                        categoryIds,
                                        categories: filterPanelData?.categories?.children || []
                                    }}
                                    forCharacteristics={{
                                        setCharacteristicIds,
                                        characteristicIds,
                                        characteristics: filterPanelData?.characteristics || []
                                    }}
                                    forMinPrice={{minPrice, setMinPrice}}
                                    forMaxPrice={{maxPrice, setMaxPrice}}
                                />
                            )}
                        </div>
                        <TopPanel
                            totalCount={catalogData?.totalCount}
                            currentPage={currentPage}
                            amount={amount}
                            handleChangePage={setCurrentPage}
                            setSortBy={setSortBy}
                            onOpenFilterPanelInMobile={() => setIsVisibleFilterPanelInMobile(true)}
                        />
                        {catalogLoading ? (
                            <Preloader color='secondary'/>
                        ) : (
                            <CardListContainer productsData={catalogData} overflowHidden={false}/>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Catalog;
