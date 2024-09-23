import React from 'react';
import classes from './PopularProducts.module.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from "swiper/modules";
import 'swiper/css/navigation';
import 'swiper/css';
import {useNavigate} from "react-router-dom";
import Preloader from "../../../../ui/Preloader/Preloader";
import NoImageBlock from "../../../../ui/blocks/NoImageBlock/NoImageBlock";

const PopularProducts = ({
                             mainCategoryName,
                             popularProducts,
                             setShowCategoryTree,
                             popularProductsByCategoryLoading,
                             popularProductsByCategoryError
                         }) => {
    const navigate = useNavigate()

    const handleClick = (productId) => {
        navigate(`/product/${productId}`)
        setShowCategoryTree(false)
    }

    const popularProductsJSX = (
        <div className={classes.popularProducts}>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={10}
                speed={800}
                slidesPerView={"auto"}
                slidesPerGroup={2}
            >
                {popularProducts.map(product => {
                    return <SwiperSlide key={product.id}>
                        <div className={classes.product} onClick={() => handleClick(product.id)}>
                            {product.images[0] ? (
                                <img src={product.images[0]} alt={mainCategoryName}/>
                            ) : (
                                <NoImageBlock/>
                            )}
                            <h4>{product.name}</h4>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )

    if (popularProductsByCategoryError) return null

    return (
        <div className={classes.wrapper}>
            {popularProductsByCategoryLoading ? <Preloader color='tertiary' overflowHidden={false}/> : (
                <>
                    <h3>Популярні товари "{mainCategoryName}"</h3>
                    {popularProductsJSX}
                </>
            )}
        </div>
    );
};

export default PopularProducts;