import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Preloader from "../../components/ui/Preloader/Preloader";
import {getBrandById} from "../../store/pageSlices/brandPageSlice";
import classes from "./ContentShowcaseItem.module.css";
import BannerBlock from "../../components/ui/blocks/BannerBlock/BannerBlock";
import CardListWithSwap from "../../components/containers/swipers/CardListWithSwap/CardListWithSwap";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";

const Brand = () => {
    const dispatch = useDispatch();
    const {data: brandData, loading: brandLoading} = useSelector(state => state.brandPage.brand);
    const brandId = useParams().id;

    useEffect(() => {
        dispatch(getBrandById(brandId))
    }, [brandId])

    if (brandLoading) return <Preloader cover={true} color='secondary'/>

    return (
        <div className={classes.wrapper}>
            <div className={classes.breadCrumbs}>
                <Breadcrumbs links={[
                    {id: '/brands', name: 'Бренди'},
                    {id: `/brands/${brandId}`, name: brandData.title}
                ]}/>
            </div>
            <p className={classes.title}>{brandData.title}</p>
            <div className={classes.banner}>
                <BannerBlock
                    text={brandData.description}
                    images={{
                        desktopImage: brandData.imageUrl,
                        laptopImage: brandData.imageUrl,
                        tabletImage: brandData.imageUrl,
                        phoneImage: brandData.imageUrl,
                        altText: brandData.title
                    }}
                />
            </div>
            <div className={classes.products}>
                {!!brandData.products?.length && (
                    <CardListWithSwap title='Добірка товарів з цього бренду' products={brandData.products}/>
                )}
            </div>
        </div>
    );
};

export default Brand;