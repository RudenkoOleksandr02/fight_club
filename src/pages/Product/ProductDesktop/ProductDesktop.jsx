import React, {useEffect, useState} from 'react';
import classes from "./ProductDesktop.module.css";
import ImagesBlock from "../ImagesBlock/ImagesBlock";
import RightPanel from "../RightPanel/RightPanel";
import Characteristics from "../Characteristics/Characteristics";
import Description from "../Description/Description";
import AboutMoreBrand from "../AboutMoreBrand/AboutMoreBrand";
import Reviews from "../Reviews/Reviews";
import AlsoBuy from "../AlsoBuy/AlsoBuy";
import {useDispatch, useSelector} from "react-redux";
import {getAlsoBoughtById} from "../../../store/pageSlices/productPageSlice";
import Ingridients from "../Ingridients/Ingridients";

const ProductDesktop = ({product}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1359);
    const {data: alsoBoughtData, loading: alsoBoughtLoading} = useSelector(state => state.productPage.alsoBought);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1359);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        dispatch(getAlsoBoughtById(product.productId))
    }, [product.productId]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.leftPanel}>
                <ImagesBlock images={product.images}/>
                <Characteristics characteristics={product.characteristics}/>
                <Description description={product.description}/>
                <Ingridients ingridients={product.ingridients}/>
                {!!alsoBoughtData.length && (
                    !isSmallScreen && <AlsoBuy data={alsoBoughtData} loading={alsoBoughtLoading}/>
                )}
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
                <AboutMoreBrand brand={product.brand}/>
            </div>
            {!!alsoBoughtData.length && (
                isSmallScreen && <div className={classes.alsoBuy}>
                    <AlsoBuy data={alsoBoughtData} loading={alsoBoughtLoading}/>
                </div>
            )}
            <div className={classes.reviews}>
                <Reviews productId={product.id}/>
            </div>
        </div>
    );
};

export default ProductDesktop;