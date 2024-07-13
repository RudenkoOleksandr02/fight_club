import React, { useEffect, useState } from 'react';
import classes from './Navigation.module.css';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from "react-router-dom";
import SearchDesktop from "../../ui/components/Search/Desctop/SearchDesktop";
import linksToCategories from '../../data/linksToCategories.json';
import { useDispatch, useSelector } from "react-redux";
import { getCategoryTree } from "../../store/categorySlice";
import CategoryTree from "./CategoryTree/CategoryTree";

const Navigation = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showCategoryTree, setShowCategoryTree] = useState(true);
    const categoryTree = useSelector((state) => state.categoryData.categoryTree);
    const dispatch = useDispatch();

    const handleSetCategoryTree = (categoryId) => {
        setCurrentCategory(categoryId);
        setShowCategoryTree(true);
    };

    const handleDellCategoryTree = () => {
        setShowCategoryTree(false);
    };

    useEffect(() => {
        if (currentCategory) {
            dispatch(getCategoryTree(currentCategory));
        }
    }, [currentCategory]);

    const linksToCategoriesJSX = (
        <div className={classes.categories}>
            {linksToCategories.map(link => (
                <NavLink
                    key={uuidv4()}
                    to={'/category/' + link.id}
                    onMouseEnter={() => handleSetCategoryTree(link.id)}
                    onMouseLeave={handleDellCategoryTree}
                >
                    {link.name}
                </NavLink>
            ))}
        </div>
    );

    return (
        <nav className={classes.navigation}>
            <div className={classes.wrapper}>
                <SearchDesktop/>
                {linksToCategoriesJSX}
            </div>
            {showCategoryTree && categoryTree && (
                <CategoryTree
                    categoryTree={categoryTree}
                    handleSetCategoryTree={() => {}}
                    handleDellCategoryTree={() => {}}
                />
            )}
        </nav>
    );
};

export default Navigation;
