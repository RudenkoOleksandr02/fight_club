import React from 'react';
import {Pagination, FreeMode} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import SwiperList from "../SwiperList/SwiperList";
import classes from './CardListWithSwap.module.css'


// --DATA--
import card_img from '../../assets/images/other/card_img.png'
const CardListWithSwap = ({ title, products }) => {
    const swiperParams = {
        modules: [Pagination, FreeMode],
        spaceBetween: 20,
        grabCursor: true,
        speed: 800,
        pagination: { clickable: true },
        freeMode: true,
        breakpoints: {
            0: {
                pagination: {
                    dynamicBullets: true
                },
                slidesPerView: "auto"
            },
            768: {
                pagination: {
                    dynamicBullets: false
                },
                slidesPerView: 3,
                slidesPerGroup: 3,
                freeMode: false
            },
            1000: {
                pagination: {
                    dynamicBullets: false
                },
                slidesPerView: 4,
                slidesPerGroup: 4,
                freeMode: false
            },
            1360: {
                pagination: {
                    dynamicBullets: false
                },
                slidesPerView: 5,
                slidesPerGroup: 5,
                freeMode: false
            }
        }
    };
    return (
        <SwiperList
            title={title}
            products={products}
            swiperParams={swiperParams}
            extraClassCardItem={classes.extraClassCardItem}
            extraClassSwiperList={classes.extraClassSwiperList}
        />
    );
};

export default CardListWithSwap;