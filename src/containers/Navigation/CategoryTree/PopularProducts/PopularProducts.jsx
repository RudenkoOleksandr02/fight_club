import React from 'react';
import classes from './PopularProducts.module.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {v4 as uuidv4} from 'uuid';

const PopularProducts = ({mainCategoryName, popularProducts}) => {
    const popularProductsJSX = (
        <div className={classes.popularProducts}>
            <Swiper
                spaceBetween={10}
                grabCursor={true}
                speed={800}
                slidesPerView={4}
            >
                {popularProducts.map(product => {
                    return <SwiperSlide key={uuidv4()}>
                        <div className={classes.product}>
                            <img src={product.images[0]}/>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )

    return (
        <div className={classes.wrapper}>
            <h3>Популярні товари {mainCategoryName}</h3>
            {popularProductsJSX}
        </div>
    );
};

export default PopularProducts;