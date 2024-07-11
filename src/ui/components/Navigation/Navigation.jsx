import React from 'react';
import classes from './Navigation.module.css';
import {v4 as uuidv4} from 'uuid';
import {NavLink} from "react-router-dom";
import SearchDesktop from "../Search/Desctop/SearchDesktop";
import linksToCategories from '../../../data/linksToCategories.json'

const Navigation = () => {
    const linksToCategoriesJSX = <div className={classes.categories}>
        {linksToCategories.map(link => {
            return <NavLink key={uuidv4()} to={link.id}>{link.name}</NavLink>
        })}
    </div>

    return (
        <nav className={classes.navigation}>
            <div className={classes.wrapper}>
                <SearchDesktop/>
                {linksToCategoriesJSX}
            </div>
        </nav>
    );
};

export default Navigation;