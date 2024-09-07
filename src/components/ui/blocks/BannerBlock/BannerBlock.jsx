import React from 'react';
import classes from "./BannerBlock.module.css";

const BannerBlock = ({text, images, onClick = () => {}, cursor = 'default'}) => {
    return (
        <div className={classes.bannerContainer} onClick={onClick} style={{cursor}}>
            <div className={classes.imageWrapper}>
                <picture>
                    <source
                        media="(min-width: 1360px)"
                        srcSet={images.desktopImage}
                    />
                    <source
                        media="(min-width: 1000px) and (max-width: 1359px)"
                        srcSet={images.laptopImage}
                    />
                    <source
                        media="(min-width: 768px) and (max-width: 999px)"
                        srcSet={images.tabletImage}
                    />
                    <source
                        media="(max-width: 767px)"
                        srcSet={images.phoneImage}
                    />
                    <img
                        src={images.desktopImage}
                        alt={images.altText}
                        className={classes.image}
                    />
                </picture>
            </div>
            <p className={classes.text}>{text}</p>
        </div>
    );
};

export default BannerBlock;