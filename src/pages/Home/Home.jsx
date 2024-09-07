import React, {useEffect} from 'react';
import CardListWithSwap from "../../components/containers/CardListWithSwap/CardListWithSwap";
import classes from './Home.module.css'
import background from '../../assets/images/background/background1.png'
import {useDispatch, useSelector} from 'react-redux'
import {getNewProducts, getDiscountsProducts, getPopularProducts} from '../../store/pageSlices/homePageSlice';
import Preloader from "../../components/ui/Preloader/Preloader";
import BannerSwiper from "../../components/containers/BannerSwiper/BannerSwiper";

const Home = () => {
    const {data: newProductsData, loading: newProductsLoading} = useSelector(state => state.homePage.newProducts);
    const {data: discountsProductsData, loading: discountsProductsLoading} = useSelector(state => state.homePage.discountsProducts);
    const {data: popularProductsData, loading: popularProductsLoading} = useSelector(state => state.homePage.popularProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNewProducts());
        dispatch(getDiscountsProducts());
        dispatch(getPopularProducts());
    }, []);

    if (newProductsLoading || discountsProductsLoading || popularProductsLoading) {
        return <Preloader color='secondary' cover={true}/>
    }

    return (
        <main className={classes.main}>
            <div className={classes.background}>
                <img src={background}/>
            </div>
            <BannerSwiper/>
            <div className={classes.inner}>
                {!!newProductsData.length && (
                    <CardListWithSwap title='Новинки' products={newProductsData}/>
                )}
                {!!discountsProductsData.length && (
                    <CardListWithSwap title='Акции и скидки' products={discountsProductsData}/>
                )}
                {!!popularProductsData.length && (
                    <CardListWithSwap title='Популярные товары' products={popularProductsData}/>
                )}
            </div>
        </main>
    );
};

export default Home;