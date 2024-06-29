import React from 'react';
import classes from './Catalog.module.css'
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import FilterPanel from "../../components/common/FilterPanel/FilterPanel";
import PaginationAndFilterPanel from "../../components/common/PaginationAndFilterPanel/PaginationAndFilterPanel";
import CardList from "../../containers/CardList/CardList";

// --DATA--
import productsData  from './../../data/productsData.json'

const Catalog = () => {
    return (
        <section>
            <div className={classes.wrapper}>
                <Breadcrumbs links={[]}/>
                <div className={classes.main}>
                    <FilterPanel/>
                    <PaginationAndFilterPanel/>
                    <CardList products={productsData}/>
                </div>
            </div>
        </section>
    );
};

export default Catalog;