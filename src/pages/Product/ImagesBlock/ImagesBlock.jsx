import React from 'react';
import classes from './ImagesBlock.module.css';
import {v4 as uuidv4} from 'uuid';
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper/modules";

const ImagesBlock = ({images}) => {
    const firstImage = images[0];
    const otherImages = images.filter((image, index) => index !== 0);

    const getSlides = () => {
        return otherImages.map((image) => {
            return <SwiperSlide key={uuidv4()}>
                <div className={classes.imageSecondaryWrapper}>
                    <img src={image} alt='product'/>
                </div>
            </SwiperSlide>
        })
    }
    const otherImagesSwapJSX = (
        <Swiper
            modules={[FreeMode]}
            spaceBetween={10}
            grabCursor={true}
            speed={800}
            freeMode={true}
            breakpoints={{
                0: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    direction: 'horizontal'
                },
                476: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    direction: 'horizontal'
                },
                592: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    direction: 'horizontal'
                },
                708: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                    direction: 'horizontal'
                },
                768: {
                    direction: 'vertical',
                    slidesPerView: 5,
                    slidesPerGroup: 5
                }
            }}
        >
            {getSlides()}
        </Swiper>
    )
    return <div className={classes.wrapper}>
        <div className={classes.mainImage}>
            <img src={firstImage} alt='product'/>
        </div>
        <div className={classes.imagesPanel}>
            {otherImagesSwapJSX}
        </div>
    </div>
};

export default ImagesBlock;