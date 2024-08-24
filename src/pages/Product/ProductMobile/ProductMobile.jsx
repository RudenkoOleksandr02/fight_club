import React from 'react';
import classes from "./ProductMobile.module.css";
import ImagesBlock from "../ImagesBlock/ImagesBlock";
import RightPanel from "../RightPanel/RightPanel";
import Characteristics from "../Characteristics/Characteristics";
import Description from "../Description/Description";
import AboutMoreBrand from "../AboutMoreBrand/AboutMoreBrand";
import Reviews from "../Reviews/Reviews";

const ProductMobile = ({product}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.images}>
                <ImagesBlock images={product.images}/>
            </div>
            <div className={classes.rightPanel}>
                <RightPanel
                    src={product.images[0]}
                    id={product.id}
                    name={product.name}
                    nameEng={product.nameEng}
                    rating={product.rating}
                    numberOfReviews={product.numberOfReviews}
                    numberOfPurchases={product.numberOfPurchases}
                    numberOfViews={product.numberOfViews}
                    article={product.article}
                    options={product.options}
                    price={product.price}
                    discount={product.discount}
                    inStock={product.inStock}
                    dieNumbers={product.dieNumbers}
                />
            </div>
            <div className={classes.characteristics}>
                <Characteristics characteristics={product.characteristics}/>
            </div>
            <div className={classes.aboutMoreBrand}>
                <AboutMoreBrand/>
            </div>
            <div className={classes.description}>
                <Description description={product.description}/>
            </div>
            <div className={classes.reviews}>
                <Reviews reviews={product.reviews}/>
            </div>
        </div>
    );
};

export default ProductMobile;