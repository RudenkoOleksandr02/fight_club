import React, {useEffect, useState} from 'react';
import classes from './imagesBlock.module.css';
import {v4 as uuidv4} from 'uuid';
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper/modules";

const ImagesBlock = ({images}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 767);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 767);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const firstImage = images[0];
    const otherImages = images.filter((image, index) => index !== 0);
    const otherImagesSwapJSX = (
        <Swiper
            modules={[FreeMode]}
            spaceBetween={10}
            grabCursor={true}
            speed={800}
            slidesPerView="auto"
            freeMode={true}
        >
            {otherImages.map(image => {
                return <SwiperSlide key={uuidv4()}>
                    <div className={classes.imageSecondaryWrapper}>
                        <img src={image} alt='product'/>
                    </div>
                </SwiperSlide>
            })}
        </Swiper>
    )

    return (
        <div className={classes.wrapper}>
            <div className={classes.mainImage}>
                <img src={firstImage} alt='product'/>
            </div>
            {isSmallScreen
                ? <div className={classes.imagesPanel}>
                    {otherImagesSwapJSX}
                </div>
                : <div className={classes.imagesPanel}>
                    {otherImages.map(image => <img key={uuidv4()} src={image} alt='product'/>)}
                </div>
            }
        </div>
    );
};

export default ImagesBlock;