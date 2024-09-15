import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../components/ui/Preloader/Preloader";
import {getBrands} from "../../store/pageSlices/brandPageSlice";
import classes from './Brands.module.css';
import BrandItem from "./BrandItem/BrandItem";

const Brands = () => {
    const dispatch = useDispatch();
    const { data: brands, loading } = useSelector(state => state.brandPage.brands);

    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    if (loading) {
        return <Preloader cover={true} color='secondary' />;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.brandList}>
                {brands.map(brand => (
                    <BrandItem
                        key={brand.brandId}
                        title={brand.title}
                        brandId={brand.brandId}
                        image={brand.imageUrl}
                        altText={brand.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default Brands;