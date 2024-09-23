import React, {useEffect} from 'react';
import classes from './Product.module.css'
import ProductDesktop from "./ProductDesktop/ProductDesktop";
import ProductMobile from "./ProductMobile/ProductMobile";
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../../store/pageSlices/productPageSlice";
import {useParams} from "react-router-dom";
import useScreen from "../../common/hooks/useScreen";
import Preloader from "../../components/ui/Preloader/Preloader";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";

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

    const linksForBreadCrumbs = [];

    if (data.mainCategory !== null) {
        linksForBreadCrumbs.push({
            name: data.mainCategory.name,
            id: `/category/${data.mainCategory.categoryId}`
        });
    }
    if (!!data.additionalCategories.length) {
        linksForBreadCrumbs.push({
            name: data.additionalCategories[0].name,
            id: `/category/${data.additionalCategories[0].categoryId}`
        });
    }

    return (
        <section>
            <div className={classes.wrapper}>
                <div className={classes.breadCrumbs}>
                    <Breadcrumbs
                        links={[...linksForBreadCrumbs, {name: data.name, id: `/product/${data.id}`}]}
                    />
                </div>
                {isSmallScreen
                    ? <ProductMobile product={data}/>
                    : <ProductDesktop product={data}/>
                }
            </div>
        </section>
    );
};

export default Product;