import React, {useEffect} from 'react';
import BannerContainer from "../../containers/BannerContainer/BannerContainer";
import CardListWithSwap from "../../containers/CardListWithSwap/CardListWithSwap";
import classes from './Home.module.css'
import background from '../../assets/images/background/background1.png'
import {useDispatch, useSelector} from 'react-redux'
import {getProductsData} from '../../store/productsSlice';

const Home = () => {
    const productsData = useSelector(state => state.productsData.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsData({
            categories: [

            ],
            sortBy: "string",
            amount: 15,
            star: 15,
            minPrice: 0,
            maxPrice: 1000,
            search: null
        }))
    }, []);

    const productsDiscount = productsData.filter(product => product.discount);
    const productsIsNew = productsData.filter(product => product.isNew);
    const productsPopular = productsData;

    return (
        <main className={classes.main}>
            <div className={classes.background}>
                <img src={background}/>
            </div>
            <BannerContainer/>
            <CardListWithSwap title='Новинки' products={productsDiscount}/>
            <CardListWithSwap title='Акции и скидки' products={productsIsNew}/>
            <CardListWithSwap title='Популярные товары' products={productsPopular}/>
        </main>
    );
};

export default Home;