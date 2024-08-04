import React, {useEffect, useState} from 'react';
import classes from './Product.module.css'
import ProductDesktop from "./ProductDesktop/ProductDesktop";
import ProductMobile from "./ProductMobile/ProductMobile";
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../../store/productSlice";
import {useParams} from "react-router-dom";
import useScreen from "../../common/hooks/useScreen/useScreen";

const Product = () => {
    const productId = useParams()
    const productData = useSelector(state => state.productData.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductById(productId.id));
    }, [productId])
    const isSmallScreen = useScreen(999);

    if (!productData) {
        return <div>preloader...</div>;
    }

    return (
        <section>
            <div className={classes.wrapper}>
                {isSmallScreen
                    ? <ProductMobile product={productData}/>
                    : <ProductDesktop product={productData}/>
                }
            </div>
        </section>
    );
};

export default Product;