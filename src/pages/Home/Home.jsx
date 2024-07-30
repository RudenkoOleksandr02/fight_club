import React, {useEffect} from 'react';
import BannerContainer from "../../containers/BannerContainer/BannerContainer";
import CardListWithSwap from "../../containers/CardListWithSwap/CardListWithSwap";
import classes from './Home.module.css'
import background from '../../assets/images/background/background1.png'
import {useDispatch, useSelector} from 'react-redux'
import {getNewProducts, getDiscountsProducts, getPopularProducts} from '../../store/homePageSlice';

const Home = () => {
    const newProducts = useSelector(state => state.homePageData.newProducts);
    const discountsProducts = useSelector(state => state.homePageData.discountsProducts);
    const popularProducts = useSelector(state => state.homePageData.popularProducts);
    const dispatch = useDispatch();
    const productsInCart = useSelector(state => {
        return state.cartForUser.productsInCart;
    });
    console.log(productsInCart);

    useEffect(() => {
        dispatch(getNewProducts());
        dispatch(getDiscountsProducts());
        dispatch(getPopularProducts());
    }, []);

    if (!(newProducts.length && discountsProducts.length && popularProducts.length)) {
        return <div>loader...</div>
    }

    return (
        <main className={classes.main}>
            <div className={classes.background}>
                <img src={background}/>
            </div>
            <BannerContainer/>
            <CardListWithSwap title='Новинки' products={newProducts}/>
            <CardListWithSwap title='Акции и скидки' products={discountsProducts}/>
            <CardListWithSwap title='Популярные товары' products={popularProducts}/>
        </main>
    );
};

export default Home;