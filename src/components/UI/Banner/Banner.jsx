import React from 'react';
import classes from './Banner.module.css';
import { v4 as uuidv4 } from 'uuid';
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// --DATA--
import banner from './../../../data/banner.json';
import img1 from './../../../assets/images/banner/banner_img1.jpg'
import img2 from './../../../assets/images/banner/banner_img2.png'
import img3 from './../../../assets/images/banner/banner_img3.png'
import img4 from './../../../assets/images/banner/banner_img4.png'
import img5 from './../../../assets/images/banner/banner_img5.png'

const Banner = () => {
    return (
        <section>
            <div className={classes.wrapper}>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={800}
                    grabCursor={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 18000 }}
                >
                    {banner.map((item) => (
                        <SwiperSlide key={uuidv4()}>
                            <div className={classes.bannerContainer}>
                                <div className={classes.bannerImage}>
                                    <img src={item.image} alt='banner' className={classes.image}/>
                                </div>
                                <div className={classes.bannerText}>
                                    <p>{item.content.text}</p>
                                    <p>{item.content.from} - {item.content.to}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Banner;
