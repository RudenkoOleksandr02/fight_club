import React from 'react';
import classes from "./ProductMobile.module.css";
import ImagesBlock from "../ImagesBlock/ImagesBlock";
import RightPanel from "../RightPanel/RightPanel";
import Characteristics from "../Characteristics/Characteristics";
import Description from "../Description/Description";
import AboutMoreBrand from "../AboutMoreBrand/AboutMoreBrand";
import Reviews from "../Reviews/Reviews";
import Ingridients from "../Ingridients/Ingridients";

const ProductMobile = ({product}) => {
    return (
        <div className={classes.wrapper}>
            <ImagesBlock images={product.images}/>
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
            <Characteristics characteristics={product.characteristics}/>
            <AboutMoreBrand brand={product.brand}/>
            <Description description={product.description}/>
            <Ingridients ingridients={product.ingridients}/>
            <Reviews productId={product.id}/>
        </div>
    );
};

export default ProductMobile;