import React, {useEffect} from 'react';
import Banner from "../../components/UI/Banner/Banner";
import CardListWithSwap from "../../containers/CardListWithSwap/CardListWithSwap";
import classes from './Home.module.css'
import background from './../../assets/images/BG.png'
import {useSelector, useDispatch} from 'react-redux'
import {
    loadProductsDataFromFile
} from '../../store/productsSlice';

const Home = () => {
    const productsData = useSelector(state => state.productsData.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProductsDataFromFile())
    }, []);

    const productsDiscount = productsData.filter(product => product.discount);
    const productsIsNew = productsData.filter(product => product.isNew);
    const productsPopular = productsData;

    return (
        <main className={classes.main}>
            <div className={classes.background}>
                <img src={background}/>
            </div>
            <Banner/>
            <CardListWithSwap title='Новинки' products={productsDiscount}/>
            <CardListWithSwap title='Акции и скидки' products={productsIsNew}/>
            <CardListWithSwap title='Популярные товары' products={productsPopular}/>
        </main>
    );
};

export default Home;