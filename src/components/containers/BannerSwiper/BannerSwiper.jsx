import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getBanners} from "../../../store/pageSlices/bannerPageSlice";
import classes from './BannerSwiper.module.css';
import Preloader from "../../ui/Preloader/Preloader";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import BannerBlock from "../../ui/blocks/BannerBlock/BannerBlock";

const BannerSwiper = () => {
    const {data: bannersData, loading: bannersLoading} = useSelector(state => state.bannerPage.banners);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBanners());
    }, []);

    return (
        <div className={classes.wrapper}>
            {bannersLoading ? <Preloader color='tertiary'/> : (
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={800}
                    pagination={{clickable: true}}
                    autoplay={{delay: 18000}}
                >
                    {!!bannersData.length && bannersData.map(banner => (
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
            )}
        </div>
    );
};

export default BannerSwiper;