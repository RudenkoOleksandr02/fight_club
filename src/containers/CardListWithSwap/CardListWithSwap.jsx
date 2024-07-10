import React from 'react';
import classes from './CardListWithSwap.module.css';
import clForCardItem from './CardItem.module.css'
import {v4 as uuidv4} from 'uuid'
import {Pagination, FreeMode} from "swiper/modules";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import CardItem from "./../../ui/CardItem/CardItem";


// --DATA--
import card_img from '../../assets/images/other/card_img.png'

const CardListWithSwap = ({title, products}) => {
    const productsListJSX = (
        <Swiper
            modules={[Pagination, FreeMode]}
            spaceBetween={20}
            grabCursor={true}
            speed={800}
            pagination={{
                clickable: true
            }}
            breakpoints={{
                0: {
                    pagination: {
                        dynamicBullets: true
                    },
                    slidesPerView: "auto",
                    freeMode: true
                },
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                1000: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                1360: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                }
            }}
        >
            {products.map(product => {
                return <SwiperSlide key={uuidv4()}>
                    <CardItem
                        src={product.image}
                        titles={[product.name, product.nameEng]}
                        price={product.price}
                        inStock={product.inStock}
                        classes={clForCardItem}
                    />
                </SwiperSlide>
            })}
        </Swiper>
    )

    return (
        <section>
            <div className={classes.wrapper}>
                <h2>{title}</h2>
                <div className={classes.cardList}>
                    {productsListJSX}
                </div>
            </div>
        </section>
    );
};

export default CardListWithSwap;