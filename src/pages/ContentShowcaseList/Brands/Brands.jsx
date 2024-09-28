import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../../components/ui/Preloader/Preloader";
import {getBrands} from "../../../store/pageSlices/brandPageSlice";
import classes from './../ContentShowcaseList.module.css';
import BrandItem from "./BrandItem";
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";
import AbsenceBlock from "../../../components/ui/blocks/AbsenceBlock/AbsenceBlock";

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
            <div className={classes.breadCrumbs}>
                <Breadcrumbs
                    links={[{
                        id: '/brands',
                        name: 'Бренди'
                    }]}
                />
            </div>
            {!!brands.length ? (
                <div className={classes.list}>
                    {brands.map(brand => (
                        <BrandItem
                            key={brand.brandId}
                            title={brand.title}
                            brandId={brand.brandId}
                            image={brand.imageUrl}
                            altText={brand.title}
                            metaKeywords={brand.metaKeywords}
                            metaDescription={brand.metaDescription}
                        />
                    ))}
                </div>
            ) : (
                <AbsenceBlock title='Список брендів порожній'
                              text="Здається, тут ще немає брендів. Можливо, вони з'являться трохи пізніше."/>
            )}
        </div>
    );
};

export default Brands;