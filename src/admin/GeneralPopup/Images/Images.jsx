import React from 'react';
import classes from "./Images.module.css";
import Image from "./Image";

const Images = ({images, handleAddImage, handleRemoveImage}) => {

    return (
        <div className={classes.wrapper}>
            <Image
                title='Зображення 1360'
                titleForBtn='Додати зображення'
                image={images.desktopImageUrl}
                imageKey='desktopImageUrl'
                handleAddImage={handleAddImage}
                handleRemoveImage={handleRemoveImage}
            />
            <Image
                title='Зображення 1000'
                titleForBtn='Додати зображення'
                image={images.laptopImageUrl}
                imageKey='laptopImageUrl'
                handleAddImage={handleAddImage}
                handleRemoveImage={handleRemoveImage}
            />
            <Image
                title='Зображення 768'
                titleForBtn='Додати зображення'
                image={images.tabletImageUrl}
                imageKey='tabletImageUrl'
                handleAddImage={handleAddImage}
                handleRemoveImage={handleRemoveImage}
            />
            <Image
                title='Зображення 360'
                titleForBtn='Додати зображення'
                image={images.phoneImageUrl}
                imageKey='phoneImageUrl'
                handleAddImage={handleAddImage}
                handleRemoveImage={handleRemoveImage}
            />
        </div>
    );
};

export default Images;