import React from 'react';
import {useNavigate} from "react-router-dom";
import classes from './BrandItem.module.css'

const BrandItem = ({title, image, brandId, altText}) => {
    const navigate = useNavigate()

    return (
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
    );
};

export default BrandItem;