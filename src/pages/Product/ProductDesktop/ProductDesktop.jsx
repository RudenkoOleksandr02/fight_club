import React, {useEffect, useState} from 'react';
import classes from "./ProductDesktop.module.css";
import ImagesBlock from "../ImagesBlock/ImagesBlock";
import RightPanel from "../RightPanel/RightPanel";
import Characteristics from "../Characteristics/Characteristics";
import Description from "../Description/Description";
import AboutMoreBrand from "../AboutMoreBrand/AboutMoreBrand";
import Reviews from "../Reviews/Reviews";
import AlsoBuy from "../../../containers/AlsoBuy/AlsoBuy";

const ProductDesktop = ({data}) => {
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

    if (data.length === 0) {
        return <div>preloader...</div>;
    }

    return (
        <div className={classes.wrapper}>
            <div className="leftPanel">
                <ImagesBlock images={data.images}/>
                <Characteristics characteristics={data.characteristics}/>
                <Description description={data.description}/>
                {!isSmallScreen && <AlsoBuy/>}
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
            {isSmallScreen && <div className={classes.alsoBuy}>
                <AlsoBuy/>
            </div>}
            <div className={classes.reviews}>
                <Reviews reviews={data.reviews}/>
            </div>
        </div>
    );
};

export default ProductDesktop;