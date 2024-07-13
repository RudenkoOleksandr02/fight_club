import React from 'react';
import classes from "./ProductMobile.module.css";
import ImagesBlock from "../ImagesBlock/ImagesBlock";
import RightPanel from "../RightPanel/RightPanel";
import Characteristics from "../Characteristics/Characteristics";
import Description from "../Description/Description";
import AboutMoreBrand from "../AboutMoreBrand/AboutMoreBrand";
import Reviews from "../Reviews/Reviews";

const ProductMobile = ({data}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.images}>
                <ImagesBlock images={data.images}/>
            </div>
            <div className={classes.rightPanel}>
                <RightPanel
                    name={data.name}
                    nameEng={data.nameEng}
                    rating={data.rating}
                    numberOfReviews={data.numberOfReviews}
                    numberOfPurchases={data.numberOfPurchases}
                    numberOfViews={data.numberOfViews}
                    article={data.article}
                    options={data.options}
                    price={data.price}
                    inStock={data.inStock}
                />
            </div>
            <div className={classes.characteristics}>
                <Characteristics characteristics={data.characteristics}/>
            </div>
            <div className={classes.aboutMoreBrand}>
                <AboutMoreBrand/>
            </div>
            <div className={classes.description}>
                <Description description={data.description}/>
            </div>
            <div className={classes.reviews}>
                <Reviews reviews={data.reviews}/>
            </div>
        </div>
    );
};

export default ProductMobile;