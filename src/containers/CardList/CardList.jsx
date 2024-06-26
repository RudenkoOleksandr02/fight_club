import React from 'react';
import classes from './CardList.module.css';
import {v4 as uuidv4} from 'uuid'
import {A11y, Pagination, FreeMode} from "swiper/modules";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import CardItem from "../../components/common/CardItem/CardItem";


// --DATA--
import productsList from './../../data/product_list.json'
import card_img from './../../assets/images/card_img.png'

const CardList = ({title}) => {
    const productsListJSX = (
        <Swiper
            modules={[Pagination, FreeMode]}
            spaceBetween={20}
            grabCursor={true}
            speed={800}
            slidesPerView="auto"
            pagination={{
                clickable: true,
                dynamicBullets: true
        }}
            freeMode={true}
            breakpoints={{
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    freeMode: false,
                    pagination: {dynamicBullets: false}
                },
                1000: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    freeMode: false,
                    pagination: {dynamicBullets: false}
                },
                1360: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    freeMode: false,
                    pagination: {dynamicBullets: false}
                }
            }}
        >
            {productsList.map(product => {
                return <SwiperSlide key={uuidv4()}>
                    <CardItem
                        src={product.image}
                        titles={[product.title, product['title_eng']]}
                        price={product.price}
                        inStock={product['in_stock']}
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

export default CardList;