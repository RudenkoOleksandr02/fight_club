import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import CardItem from "../../CardItem/CardItem";
import classes from './SwiperList.module.css';
import {v4 as uuidv4} from 'uuid';

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
                        {products.map(product => (
                            <SwiperSlide key={uuidv4()}>
                                {renderSlide ? renderSlide(product) : (
                                    <CardItem
                                        id={product.id}
                                        path={`/product/${product.id}`}
                                        src={product.images && product.images.length > 0 && product.images[0] || product.image !== null && product.image}
                                        titles={[product.name, product.nameEng]}
                                        price={product.price}
                                        discount={product.discount}
                                        inStock={product.inStock}
                                        isHit={product.isHit}
                                        isNew={product.isNew}
                                        rating={product.rating}
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
