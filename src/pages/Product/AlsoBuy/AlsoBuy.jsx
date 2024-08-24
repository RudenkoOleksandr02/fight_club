import React, {useEffect} from 'react';
import {Pagination} from "swiper/modules";
import classes from './AlsoBuy.module.css'
import SwiperList from "../../../components/containers/SwiperList/SwiperList";
import {useDispatch, useSelector} from "react-redux";
import {getAlsoBoughtById} from '../../../store/productPageSlice'
import Preloader from "../../../components/ui/Preloader/Preloader";


const AlsoBuy = ({ productId }) => {
    const {data, loading} = useSelector(state => state.productPage.alsoBought);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlsoBoughtById(productId))
    }, [productId]);

    if (loading) return <Preloader color='secondary' cover={true}/>

    const swiperParams = {
        modules: [Pagination],
        spaceBetween: 20,
        grabCursor: true,
        speed: 800,
        slidesPerView: 3,
        slidesPerGroup: 3,
        pagination: { clickable: true },
    };

    return (
        <SwiperList
            title='Також купують'
            products={data}
            swiperParams={swiperParams}
            extraClassCardItem={classes.extraClassCardItem}
            extraClassSwiperList={classes.extraClassSwiperList}
        />
    );
};

export default AlsoBuy;