import React, {useEffect, useState} from 'react';
import classes from './../Catalog.module.css';
import FilterPanel from "../../../components/containers/FilterPanel/FilterPanel";
import TopPanel from "../../../components/ui/TopPanel/TopPanel";
import CardListContainer from "../../../components/containers/CardListContainer/CardListContainer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import useBodyOverflowHidden from "../../../common/hooks/useBodyOverflowHidden";
import {
    getFilterPanelById,
    getProductsByFilter,
    getSecondaryCategoryById,
    getTertiaryCategoryById,
    clearCategoryData, getFirstCategoryById
} from "../../../store/pageSlices/catalogPageSlice";
import Preloader from "../../../components/ui/Preloader/Preloader";
import AbsenceBlock from "../../../components/ui/blocks/AbsenceBlock/AbsenceBlock";
import useProductCatalog from '../../../common/hooks/useProductCatalog';
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";

const Products = () => {
    const {id: categoryId} = useParams();
    const dispatch = useDispatch();

    const {data: catalogData, loading: catalogLoading} = useSelector(state => state.catalogPage.catalog);
    const {data: firstCategoryData} = useSelector(state => state.catalogPage.firstCategory);
    const {data: secondaryCategoryData} = useSelector(state => state.catalogPage.secondaryCategory);
    const {
        data: tertiaryCategoryData,
        loading: tertiaryCategoryLoading
    } = useSelector(state => state.catalogPage.tertiaryCategory);
    const {loading: filterPanelLoading, data: filterPanelData} = useSelector(state => state.catalogPage.filterPanel);

    const {
        currentPage,
        setCurrentPage,
        sortBy,
        setSortBy,
        categoryIds,
        setCategoryIds,
        characteristicIds,
        setCharacteristicIds,
        brandIds,
        setBrandIds,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        isVisibleFilterPanelInMobile,
        setIsVisibleFilterPanelInMobile,
        isPageLoading,
        handleApplyFilter,
        handleResetFilter,
        amount,
    } = useProductCatalog({
        fetchFilterPanelData: getFilterPanelById,
        fetchProductsData: getProductsByFilter,
        initialParams: {filterPanelData},
        identifier: categoryId,
        identifierKey: 'categoryId',
    });

    useEffect(() => {

    }, []);

    useEffect(() => {
        dispatch(getTertiaryCategoryById(categoryId));
        dispatch(clearCategoryData());
    }, [categoryId]);

    useEffect(() => {
        if (tertiaryCategoryData) {
            dispatch(getSecondaryCategoryById(tertiaryCategoryData.parentCategoryId));
        }
    }, [tertiaryCategoryData]);
    useEffect(() => {
        if (secondaryCategoryData) {
            dispatch(getFirstCategoryById(secondaryCategoryData.parentCategoryId));
        }
    }, [secondaryCategoryData])

    useBodyOverflowHidden(isVisibleFilterPanelInMobile);

    if (isPageLoading || tertiaryCategoryLoading) return <Preloader color='secondary' cover={true}/>;

    const linksForBreadCrumbs = [];
    if (!Array.isArray(firstCategoryData) && !!secondaryCategoryData.parentCategoryId) {
        linksForBreadCrumbs.push({
            name: firstCategoryData.name,
            id: `/category/${firstCategoryData.categoryId}`
        });
    }
    if (!Array.isArray(secondaryCategoryData) && !!tertiaryCategoryData.parentCategoryId) {
        linksForBreadCrumbs.push({
            name: secondaryCategoryData.name,
            id: `/category/${secondaryCategoryData.categoryId}`
        });
    }
    if (tertiaryCategoryData) {
        linksForBreadCrumbs.push({
            name: tertiaryCategoryData.name,
            id: `/category/${tertiaryCategoryData.categoryId}`
        });
    }

    return (
        <section>
            <div className={classes.wrapper}>
                <div className={classes.breadCrumbs}>
                    <Breadcrumbs links={linksForBreadCrumbs}/>
                </div>
                {!catalogLoading && (!catalogData?.products?.length) ? (
                    <AbsenceBlock
                        title='Будь ласка, зайдіть пізніше.'
                        text='Товари у цій категорії тимчасово відсутні.'
                    />
                ) : (
                    <div className={classes.main}>
                        <div
                            className={`${classes.filterPanel} ${
                                isVisibleFilterPanelInMobile ? classes.visible : ''
                            }`}
                        >
                            {filterPanelLoading ? (
                                <Preloader color='tertiary'/>
                            ) : (
                                <FilterPanel
                                    handleApplyFilter={handleApplyFilter}
                                    handleResetFilter={handleResetFilter}
                                    onCloseFilterPanelInMobile={() => setIsVisibleFilterPanelInMobile(false)}
                                    forCategories={{
                                        setCategoryIds,
                                        categoryIds,
                                        categories: filterPanelData?.categories?.children || [],
                                    }}
                                    forCharacteristics={{
                                        setCharacteristicIds,
                                        characteristicIds,
                                        characteristics: filterPanelData?.characteristics || [],
                                    }}
                                    forBrands={{
                                        setBrandIds,
                                        brandIds,
                                        brands: filterPanelData?.brands || [],
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

export default Products;
