import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getBannerById,
    getFilterPanelBannerById,
    getProductsByBannerFilter
} from "../../store/pageSlices/bannerPageSlice";
import Preloader from "../../components/ui/Preloader/Preloader";
import useBodyOverflowHidden from "../../common/hooks/useBodyOverflowHidden";
import classes from "./BannerPage.module.css";
import FilterPanel from "../../components/containers/FilterPanel/FilterPanel";
import TopPanel from "../../components/ui/TopPanel/TopPanel";
import CardListContainer from "../../components/containers/CardListContainer/CardListContainer";
import BannerBlock from "../../components/ui/blocks/BannerBlock/BannerBlock";
import AbsenceBlock from "../../components/ui/blocks/AbsenceBlock/AbsenceBlock";

const BannerPage = () => {
    const dispatch = useDispatch();
    const {id: bannerId} = useParams();

    const {data: bannerData, loading: bannerLoading} = useSelector(state => state.bannerPage.banner);
    const {data: productsData, loading: productsLoading} = useSelector(state => state.bannerPage.products);
    const {data: filterPanelData, loading: filterPanelLoading} = useSelector(state => state.bannerPage.filterPanel)

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

    // CHANGE BANNER ID
    useEffect(() => {
        setIsPageLoading(true);

        setCurrentPage(1);
        setSortBy("");
        setCategoryIds([]);
        setCharacteristicIds([]);
        setMinPrice(0);
        setMaxPrice(0);

        dispatch(getFilterPanelBannerById(bannerId))
            .then(() => fetchProducts(1, [], [], filterPanelData.maxPrice, filterPanelData.minPrice, ""))
            .then(() => dispatch(getBannerById(bannerId)))
            .finally(() => setIsPageLoading(false))
    }, [bannerId])

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
        dispatch(getProductsByBannerFilter({
            bannerId,
            sortBy: actualSortBy,
            amount,
            start: (actualCurrentPage - 1) * amount,
            minPrice: actualMinPrice,
            maxPrice: actualMaxPrice,
            selectedCharacteristics: actualCharacteristicIds,
            categoryIds: actualCategoryIds
        }));
    }, [bannerId, amount, characteristicIds, categoryIds, minPrice, maxPrice, sortBy, currentPage]);

    // APPLY FILTER
    const handleApplyFilter = () => {
        setCurrentPage(1);
        fetchProducts(1);
    };

    // APPLY SORT AND CHANGE PAGE
    useEffect(() => {
        fetchProducts();
    }, [currentPage, sortBy]);

    if (isPageLoading) return <Preloader color='secondary' cover={true}/>
    console.log(filterPanelData?.categories)
    return (
        <section>
            <div className={classes.wrapper}>
                {!!bannerData.desktopImageUrl
                || !!bannerData.laptopImageUrl
                || !!bannerData.tabletImageUrl
                || !!bannerData.phoneImageUrl ? (
                    <BannerBlock
                        text={bannerData.description}
                        images={{
                            desktopImage: bannerData.desktopImageUrl,
                            laptopImage: bannerData.laptopImageUrl,
                            tabletImage: bannerData.tabletImageUrl,
                            phoneImage: bannerData.phoneImageUrl,
                            altText: bannerData.altText
                        }}
                    />
                ) : null}
                {!productsLoading && (!productsData?.products?.length) ? (
                    <div className={classes.absence}>
                        <AbsenceBlock
                            title='Будь ласка, зайдіть пізніше.'
                            text='Товари у цій категорії тимчасово відсутні.'
                        />
                    </div>
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
                                        categories: filterPanelData?.categories || []
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
                            totalCount={productsData?.totalCount}
                            currentPage={currentPage}
                            amount={amount}
                            handleChangePage={setCurrentPage}
                            setSortBy={setSortBy}
                            onOpenFilterPanelInMobile={() => setIsVisibleFilterPanelInMobile(true)}
                        />
                        {productsLoading ? (
                            <Preloader color='secondary' overflowHidden={false}/>
                        ) : (
                            <CardListContainer productsData={productsData}/>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BannerPage;