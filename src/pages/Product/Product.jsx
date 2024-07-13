import React, {useEffect, useState} from 'react';
import classes from './Product.module.css'
import ProductDesktop from "./ProductDesktop/ProductDesktop";
import ProductMobile from "./ProductMobile/ProductMobile";
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../../store/productSlice";
import {useParams} from "react-router-dom";

const Product = () => {
    const productId = useParams()
    const productData = useSelector(state => state.productData.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductById(productId.id));
    }, [productId])
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 999);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 999);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!productData) {
        return <div>preloader...</div>;
    }

    return (
        <section>
            <div className={classes.wrapper}>
                {isSmallScreen
                    ? <ProductMobile data={productData}/>
                    : <ProductDesktop data={productData}/>
                }
            </div>
        </section>
    );
};

export default Product;