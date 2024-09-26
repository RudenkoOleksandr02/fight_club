import React, {useEffect, useState} from 'react';
import classes from './ImagesBlock.module.css';
import {v4 as uuidv4} from 'uuid';
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper/modules";
import ModalImage from "../../../components/ui/ModalImage/ModalImage";
import NoImageBlock from "../../../components/ui/blocks/NoImageBlock/NoImageBlock";

const ImagesBlock = ({images, name}) => {
    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedModalImage, selectedOpenModalImage] = useState(null)

    const handleChangeImage = (image) => {
        setSelectedImage(image)
    }
    const handleOpenImage = () => {
        selectedOpenModalImage(selectedImage)
    }
    useEffect(() => {
        setSelectedImage(images[0])
    }, [images]);

    const getSlides = () => {
        return images.map((image, index) => {
            const numSlide = index + 1;

            return <SwiperSlide key={uuidv4()}>
                <div
                    className={selectedImage === image ? `${classes.imageSecondaryWrapper} ${classes.active}` : classes.imageSecondaryWrapper}
                    onClick={() => handleChangeImage(image)}
                >
                    <img src={image} alt={'image slide ' + numSlide + ' for ' + name}/>
                </div>
            </SwiperSlide>
        })
    }
    const otherImagesSwapJSX = (
        <Swiper
            modules={[FreeMode]}
            spaceBetween={10}
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
        <div className={classes.mainImage} onClick={handleOpenImage}>
            {selectedImage ? (
                <img src={selectedImage} alt={name}/>
            ) : (
                <NoImageBlock/>
            )}

        </div>
        {!!images.length && (
            <div className={classes.imagesPanel}>
                {otherImagesSwapJSX}
            </div>
        )}
        {selectedModalImage && (
            <ModalImage
                onClose={() => selectedOpenModalImage(null)}
                selectedImage={selectedModalImage}
            />
        )}
    </div>
};

export default ImagesBlock;