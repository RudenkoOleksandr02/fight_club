import React from 'react';
import {useNavigate} from "react-router-dom";
import classes from './BannerSwiper.module.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import BannerBlock from "../../../ui/blocks/BannerBlock/BannerBlock";

const BannerSwiper = ({bannersData}) => {
    const navigate = useNavigate();

    return (
        <div className={classes.wrapper}>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                speed={800}
                pagination={{clickable: true}}
                autoplay={{delay: 18000}}
            >
                {bannersData.map(banner => (
                    <SwiperSlide key={banner.bannerId}>
                        <BannerBlock
                            text={banner.title}
                            images={{
                                desktopImage: banner.desktopImageUrl,
                                laptopImage: banner.laptopImageUrl,
                                tabletImage: banner.tabletImageUrl,
                                phoneImage: banner.phoneImageUrl,
                                altText: banner.altText
                            }}
                            onClick={() => navigate(`/banner/${banner.bannerId}`)}
                            cursor='pointer'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSwiper;