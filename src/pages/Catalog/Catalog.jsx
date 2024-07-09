import React, {useEffect} from 'react';
import classes from './Catalog.module.css'
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import FilterPanel from "./FilterPanel/FilterPanel";
import TopPanel from "./TopPanel/TopPanel";
import CardList from "../../containers/CardList/CardList";

// --DATA--
import productsData  from './../../data/productsData.json'
import {useDispatch, useSelector} from "react-redux";
import {getCatalogData} from "../../store/catalogSlice";

const Catalog = () => {
    const catalogData = useSelector(state => state.catalogData.data);
    const dispatch = useDispatch();
    console.log(catalogData);

    useEffect(() => {
        dispatch(getCatalogData())
    }, []);

    return (
        <section>
            <div className={classes.wrapper}>
                {/*<Breadcrumbs links={[]}/>*/}
                <div className={classes.main}>
                    <FilterPanel/>
                    <TopPanel/>
                    <CardList products={productsData}/>
                </div>
            </div>
        </section>
    );
};

export default Catalog;