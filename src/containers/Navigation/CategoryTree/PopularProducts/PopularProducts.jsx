import React from 'react';
import classes from './PopularProducts.module.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from "swiper/modules";
import 'swiper/css/free-mode';
import 'swiper/css';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";

const PopularProducts = ({mainCategoryName, popularProducts, setShowCategoryTree}) => {
    const navigate = useNavigate()

    const handleClick = (productId) => {
        navigate(`/product/${productId}`)
        setShowCategoryTree(false)
    }

    const popularProductsJSX = (
        <div className={classes.popularProducts}>
            <Swiper
                modules={[FreeMode]}
                spaceBetween={10}
                grabCursor={true}
                speed={800}
                slidesPerView={"auto"}
                freeMode={true}
            >
                {popularProducts.map(product => {
                    return <SwiperSlide key={uuidv4()}>
                        <div className={classes.product} onClick={() => handleClick(product.id)}>
                            <img src={product.images[0]} alt={mainCategoryName}/>
                            <h4>{product.name}</h4>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )

    return (
        <div className={classes.wrapper}>
            <h3>Популярні товари "{mainCategoryName}"</h3>
            {popularProductsJSX}
        </div>
    );
};

export default PopularProducts;