import React from 'react';
import classes from './Navigation.module.css';
import {v4 as uuidv4} from 'uuid';
import {NavLink} from "react-router-dom";
import Search from "../Search/Search";

// --DATA--
import categories from './../../../data/categories_product.json';

const Navigation = () => {
    const categoriesJSX = categories.map(category => {
        return <NavLink key={uuidv4()}>
            {category.title}
        </NavLink>
    })

    return (
        <nav className={classes.navigation}>
            <div className={classes.wrapper}>
                <Search/>
                <div className={classes.categories}>
                    {categoriesJSX}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;