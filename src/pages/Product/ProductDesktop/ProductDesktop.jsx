import React, {useEffect, useState} from 'react';
import classes from "./ProductDesktop.module.css";
import ImagesBlock from "../ImagesBlock/ImagesBlock";
import RightPanel from "../RightPanel/RightPanel";
import Characteristics from "../Characteristics/Characteristics";
import Description from "../Description/Description";
import AboutMoreBrand from "../AboutMoreBrand/AboutMoreBrand";
import Reviews from "../Reviews/Reviews";
import AlsoBuy from "../../../containers/AlsoBuy/AlsoBuy";

const ProductDesktop = ({product}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1359);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1359);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={classes.wrapper}>
            <div className="leftPanel">
                <ImagesBlock images={product.images}/>
                <Characteristics characteristics={product.characteristics}/>
                <Description description={product.description}/>
                {!isSmallScreen && <AlsoBuy productId={product.id}/>}
            </div>
            <div className="rightPanel">
                <RightPanel
                    name={product.name}
                    nameEng={product.nameEng}
                    rating={product.rating}
                    numberOfReviews={product.numberOfReviews}
                    numberOfPurchases={product.numberOfPurchases}
                    numberOfViews={product.numberOfViews}
                    article={product.article}
                    options={product.options}
                    price={product.price}
                    inStock={product.inStock}
                    dieNumbers={product.dieNumbers}
                />
                <AboutMoreBrand/>
            </div>
            {isSmallScreen && <div className={classes.alsoBuy}>
                <AlsoBuy productId={product.id}/>
            </div>}
            <div className={classes.reviews}>
                <Reviews reviews={product.reviews}/>
            </div>
        </div>
    );
};

export default ProductDesktop;