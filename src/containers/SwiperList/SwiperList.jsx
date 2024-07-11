import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import CardItem from "../../ui/components/CardItem/CardItem";
import classes from './SwiperList.module.css';

const SwiperList = ({
                        title,
                        products,
                        swiperParams,
                        renderSlide,
                        extraClassCardItem = '',
                        extraClassSwiperList = ''
                    }) => {
    return (
        <section>
            <div className={`${classes.wrapper} ${extraClassSwiperList}`}>
                {title && <h2>{title}</h2>}
                <div className={classes.cardList}>
                    <Swiper {...swiperParams}>
                        {products.map((product, index) => (
                            <SwiperSlide key={index}>
                                {renderSlide ? renderSlide(product) : (
                                    <CardItem
                                        src={product.images[0]}
                                        titles={[product.name, product.nameEng]}
                                        price={product.price}
                                        inStock={product.inStock}
                                        extraClass={extraClassCardItem}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default SwiperList;
