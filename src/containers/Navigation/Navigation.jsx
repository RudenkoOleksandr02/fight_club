import React, {useEffect, useState} from 'react';
import classes from './Navigation.module.css';
import {NavLink} from "react-router-dom";
import SearchDesktop from "../Search/Desctop/SearchDesktop";
import linksToCategories from '../../data/linksToCategories.json';
import {useDispatch, useSelector} from "react-redux";
import {getCategoryTree} from "../../store/categorySlice";
import CategoryTree from "./CategoryTree/CategoryTree";

const Navigation = () => {
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [showCategoryTree, setShowCategoryTree] = useState(false);
    const categoryTree = useSelector((state) => state.categoryData.categoryTree);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentCategoryId) {
            dispatch(getCategoryTree(currentCategoryId));
        }
    }, [currentCategoryId]);

    const handleSetCategoryTree = (categoryId) => {
        setCurrentCategoryId(categoryId);
        setShowCategoryTree(true);
    };

    const handleDellCategoryTree = () => {
        setCurrentCategoryId(null);
        setShowCategoryTree(false);
    };

    const linksToCategoriesJSX = (
        <div className={classes.mainCategories}>
            {linksToCategories.map(link => (
                <NavLink
                    key={link.id}
                    to={'/category/' + link.id}
                    onMouseEnter={() => handleSetCategoryTree(link.id)}
                >
                    {link.name}
                </NavLink>
            ))}
        </div>
    );

    return (
        <nav
            className={showCategoryTree ? `${classes.navigation} ${classes.fill}` : classes.navigation}
            onMouseLeave={handleDellCategoryTree}
        >
            <div className={classes.mainCategoriesAndSearch}>
                <SearchDesktop/>
                {linksToCategoriesJSX}
            </div>
            <div
                className={`${classes.categoryTree} ${showCategoryTree ? classes.visible : ''}`}
            >
                <CategoryTree
                    categoryTree={categoryTree}
                    setShowCategoryTree={setShowCategoryTree}
                />
            </div>
        </nav>
    );
};

export default Navigation;
