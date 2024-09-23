import React, {useEffect} from 'react';
import CardListWithSwap from "../../components/containers/swipers/CardListWithSwap/CardListWithSwap";
import classes from './Home.module.css';
import background from '../../assets/images/background/background1.png';
import {useDispatch, useSelector} from 'react-redux';
import {getNewProducts, getDiscountsProducts, getPopularProducts} from '../../store/pageSlices/homePageSlice';
import Preloader from "../../components/ui/Preloader/Preloader";
import BannerSwiper from "../../components/containers/swipers/BannerSwiper/BannerSwiper";
import {getBanners} from "../../store/pageSlices/bannerPageSlice";

const Home = () => {
    const {data: newProductsData, loading: newProductsLoading} = useSelector(state => state.homePage.newProducts);
    const {
        data: discountsProductsData,
        loading: discountsProductsLoading
    } = useSelector(state => state.homePage.discountsProducts);
    const {
        data: popularProductsData,
        loading: popularProductsLoading
    } = useSelector(state => state.homePage.popularProducts);
    const {data: bannersData, loading: bannersLoading} = useSelector(state => state.bannerPage.banners);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNewProducts());
        dispatch(getDiscountsProducts());
        dispatch(getPopularProducts());
        dispatch(getBanners());
    }, []);

    if (newProductsLoading || discountsProductsLoading || popularProductsLoading || bannersLoading) {
        return <Preloader color='secondary' cover={true}/>
    }

    return (
        <main className={classes.main}>
            <div className={classes.background}>
                <img src={background} alt='background'/>
            </div>
            {!!bannersData.length ? (
                <BannerSwiper bannersData={bannersData}/>
            ) : (
                <div className={classes.bannerStub}></div>
            )}
            <div className={`${classes.swiper} ${classes.firstSwiper}`}>
                {!!newProductsData.length ? (
                    <CardListWithSwap title='Новинки' products={newProductsData}/>
                ) : (
                    <div className={classes.swiperStub}></div>
                )}
            </div>
            <div className={classes.swiper}>
                {!!discountsProductsData.length ? (
                    <CardListWithSwap title='Акції та знижки' products={discountsProductsData}/>
                ) : (
                    <div className={classes.swiperStub}></div>
                )}
            </div>
            <div className={classes.swiper}>
                {!!popularProductsData.length ? (
                    <CardListWithSwap title='Популярні товари' products={popularProductsData}/>
                ) : (
                    <div className={classes.swiperStub}></div>
                )}
            </div>
        </main>
    );
};

export default Home;