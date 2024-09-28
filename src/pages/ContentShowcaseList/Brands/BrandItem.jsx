import React from 'react';
import {useNavigate} from "react-router-dom";
import classes from './../Item.module.css'
import {Helmet, HelmetProvider} from "react-helmet-async";

const BrandItem = ({title, image, brandId, altText, metaKeywords, metaDescription}) => {
    const navigate = useNavigate()

    return (
        <HelmetProvider>
            <Helmet>
                <title>BLOSSOM</title>
                <meta name="description"
                      content={metaDescription !== null ? metaDescription : ''}
                />
                <meta name="keywords"
                      content={metaKeywords !== null ? metaKeywords : ''}
                />
            </Helmet>
            <div className={classes.wrapper} onClick={() => navigate(`/brands/${brandId}`)}>
                <div className={classes.imageWrapper}>
                    <img
                        src={image}
                        alt={altText}
                        className={classes.image}
                    />
                </div>
                <p className={classes.title}>{title}</p>
            </div>
        </HelmetProvider>
    );
};

export default BrandItem;