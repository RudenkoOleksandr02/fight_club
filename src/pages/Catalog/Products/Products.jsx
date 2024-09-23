import React, {useEffect, useState} from 'react';
import classes from './../Catalog.module.css';
import FilterPanel from "../../../components/containers/FilterPanel/FilterPanel";
import TopPanel from "../../../components/ui/TopPanel/TopPanel";
import CardListContainer from "../../../components/containers/CardListContainer/CardListContainer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBodyOverflowHidden from "../../../common/hooks/useBodyOverflowHidden";
import {
    getParentCategoryById,
    getFilterPanelById,
    getProductsByFilter,
    getChildrenCategoryById, clearParentCategoryData
} from "../../../store/pageSlices/catalogPageSlice";
import Preloader from "../../../components/ui/Preloader/Preloader";
import AbsenceBlock from "../../../components/ui/blocks/AbsenceBlock/AbsenceBlock";
import useProductCatalog from '../../../common/hooks/useProductCatalog';
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";

const Products = () => {
    const { id: categoryId } = useParams();
    const dispatch = useDispatch();

    const { data: catalogData, loading: catalogLoading } = useSelector(state => state.catalogPage.catalog);
    const { data: parentCategoryData, loading: parentCategoryLoading } = useSelector(state => state.catalogPage.parentCategory);
    const { data: childrenCategoryData, loading: childrenCategoryLoading } = useSelector(state => state.catalogPage.childrenCategory);
    const { loading: filterPanelLoading, data: filterPanelData } = useSelector(state => state.catalogPage.filterPanel);

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
        amount,
    } = useProductCatalog({
        fetchFilterPanelData: getFilterPanelById,
        fetchProductsData: getProductsByFilter,
        initialParams: { filterPanelData },
        identifier: categoryId,
        identifierKey: 'categoryId',
    });

    useEffect(() => {
        dispatch(getChildrenCategoryById(categoryId));
        dispatch(clearParentCategoryData());
    }, [categoryId]);

    useEffect(() => {
        if (childrenCategoryData && childrenCategoryData) {
            dispatch(getParentCategoryById(childrenCategoryData.parentCategoryId));
        }
    }, [childrenCategoryData]);


    useBodyOverflowHidden(isVisibleFilterPanelInMobile);

    if (isPageLoading || childrenCategoryLoading) return <Preloader color='secondary' cover={true} />;

    const linksForBreadCrumbs = [];

    if (!Array.isArray(parentCategoryData) && !!childrenCategoryData.parentCategoryId) {
        linksForBreadCrumbs.push({
            name: parentCategoryData.name,
            id: `/category/${parentCategoryData.categoryId}`
        });
    }
    if (childrenCategoryData) {
        linksForBreadCrumbs.push({
            name: childrenCategoryData.name,
            id: `/category/${childrenCategoryData.categoryId}`
        });
    }

    return (
        <section>
            <div className={classes.wrapper}>
                <div className={classes.breadCrumbs}>
                    <Breadcrumbs links={linksForBreadCrumbs} />
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
                                <Preloader color='tertiary' />
                            ) : (
                                <FilterPanel
                                    handleApplyFilter={handleApplyFilter}
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
                                    forMinPrice={{ minPrice, setMinPrice }}
                                    forMaxPrice={{ maxPrice, setMaxPrice }}
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
                            <Preloader color='secondary' />
                        ) : (
                            <CardListContainer productsData={catalogData} overflowHidden={false} />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;
