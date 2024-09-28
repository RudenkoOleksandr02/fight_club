import React from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getBannerById,
    getFilterPanelBannerById,
    getProductsByBannerFilter,
} from "../../../store/pageSlices/bannerPageSlice";
import Preloader from "../../../components/ui/Preloader/Preloader";
import useBodyOverflowHidden from "../../../common/hooks/useBodyOverflowHidden";
import classes from "./../Catalog.module.css";
import FilterPanel from "../../../components/containers/FilterPanel/FilterPanel";
import TopPanel from "../../../components/ui/TopPanel/TopPanel";
import CardListContainer from "../../../components/containers/CardListContainer/CardListContainer";
import BannerBlock from "../../../components/ui/blocks/BannerBlock/BannerBlock";
import AbsenceBlock from "../../../components/ui/blocks/AbsenceBlock/AbsenceBlock";
import useProductCatalog from '../../../common/hooks/useProductCatalog';
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";
import {Helmet, HelmetProvider} from "react-helmet-async";

const BannerPage = () => {
    const { id: bannerId } = useParams();

    const { data: bannerData, loading: bannerLoading } = useSelector(state => state.bannerPage.banner);
    const { data: productsData, loading: productsLoading } = useSelector(state => state.bannerPage.products);
    const { data: filterPanelData, loading: filterPanelLoading } = useSelector(state => state.bannerPage.filterPanel);

    const dispatch = useDispatch();

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
        fetchFilterPanelData: getFilterPanelBannerById,
        fetchProductsData: getProductsByBannerFilter,
        initialParams: { filterPanelData },
        identifier: bannerId,
        identifierKey: 'bannerId',
    });

    useBodyOverflowHidden(isVisibleFilterPanelInMobile);

    React.useEffect(() => {
        dispatch(getBannerById(bannerId));
    }, [bannerId, dispatch]);

    if (isPageLoading) return <Preloader color='secondary' cover={true} />;

    return (
        <HelmetProvider>
            <Helmet>
                <title>BLOSSOM</title>
                <meta name="description"
                      content={bannerData.metaDescription !== null ? bannerData.metaDescription : ''}
                />
                <meta name="keywords"
                      content={bannerData.metaKeywords !== null ? bannerData.metaKeywords : ''}
                />
            </Helmet>
            <section>
                <div className={classes.wrapper}>
                    <div className={classes.breadCrumbs}>
                        <Breadcrumbs
                            links={[
                                {
                                    name: bannerData.title,
                                    id: `/banner/${bannerData.bannerId}`
                                }
                            ]}
                        />
                    </div>
                    {(bannerData.desktopImageUrl ||
                        bannerData.laptopImageUrl ||
                        bannerData.tabletImageUrl ||
                        bannerData.phoneImageUrl) && (
                        <div className={classes.banner}>
                            <BannerBlock
                                text={bannerData.description}
                                images={{
                                    desktopImage: bannerData.desktopImageUrl,
                                    laptopImage: bannerData.laptopImageUrl,
                                    tabletImage: bannerData.tabletImageUrl,
                                    phoneImage: bannerData.phoneImageUrl,
                                    altText: bannerData.altText,
                                }}
                            />
                        </div>
                    )}
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
                                            categories: filterPanelData?.categories || [],
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
        </HelmetProvider>
    );
};

export default BannerPage;
