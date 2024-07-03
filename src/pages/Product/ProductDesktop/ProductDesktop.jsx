import React from 'react';
import classes from "./ProductDesktop.module.css";
import ImagesBlock from "../ImagesBlock/ImagesBlock";
import RightPanel from "../RightPanel/RightPanel";
import Characteristics from "../Characteristics/Characteristics";
import Description from "../Description/Description";
import AboutMoreBrand from "../AboutMoreBrand/AboutMoreBrand";

const ProductDesktop = ({data}) => {
    return (
        <div className={classes.wrapper}>
            <div className="leftPanel">
                <ImagesBlock images={data.images}/>
                <Characteristics characteristics={data.characteristics}/>
                <Description description={data.description}/>
            </div>
            <div className="rightPanel">
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
                <AboutMoreBrand/>
            </div>
            <div className={classes.alsoBuy}>alsoBuy</div>
            <div className={classes.reviews}>reviews</div>
        </div>
    );
};

export default ProductDesktop;