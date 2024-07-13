import React, {useEffect} from 'react';
import {Pagination} from "swiper/modules";
import classes from './AlsoBuy.module.css'
import SwiperList from "../SwiperList/SwiperList";
import {useDispatch, useSelector} from "react-redux";
import {getAlsoBoughtById} from '../../store/productSlice'


const AlsoBuy = ({ productId }) => {
    const alsoBought = useSelector(state => state.productData.alsoBought);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlsoBoughtById(productId))
    }, [productId]);

    if (!alsoBought) return <div>preloader...</div>

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
            products={alsoBought}
            swiperParams={swiperParams}
            extraClassCardItem={classes.extraClassCardItem}
            extraClassSwiperList={classes.extraClassSwiperList}
        />
    );
};

export default AlsoBuy;