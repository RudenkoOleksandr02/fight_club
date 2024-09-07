import React, {useEffect, useState} from 'react';
import classes from './Product.module.css'
import ProductDesktop from "./ProductDesktop/ProductDesktop";
import ProductMobile from "./ProductMobile/ProductMobile";
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../../store/pageSlices/productPageSlice";
import {useParams} from "react-router-dom";
import useScreen from "../../common/hooks/useScreen";
import Preloader from "../../components/ui/Preloader/Preloader";

const Product = () => {
    const productId = useParams()
    const {data, loading} = useSelector(state => state.productPage.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductById(productId.id));
    }, [productId]);
    const isSmallScreen = useScreen(999);

    if (loading) {
        return <Preloader color='secondary' cover={true}/>;
    }

    return (
        <section>
            <div className={classes.wrapper}>
                {isSmallScreen
                    ? <ProductMobile product={data}/>
                    : <ProductDesktop product={data}/>
                }
            </div>
        </section>
    );
};

export default Product;