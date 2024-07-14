import React, {useEffect, useState, useCallback} from 'react';
import classes from './Navigation.module.css';
import {NavLink} from "react-router-dom";
import SearchDesktop from "../../ui/components/Search/Desctop/SearchDesktop";
import linksToCategories from '../../data/linksToCategories.json';
import {useDispatch, useSelector} from "react-redux";
import {getCategoryTree} from "../../store/categorySlice";
import CategoryTree from "./CategoryTree/CategoryTree";

const Navigation = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showCategoryTree, setShowCategoryTree] = useState(false);
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
    }, [currentCategory, dispatch]);

    const linksToCategoriesJSX = (
        <div className={classes.categories}>
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
            onMouseLeave={handleDellCategoryTree}
            className={showCategoryTree ? `${classes.navigation} ${classes.fill}` : classes.navigation}
        >
            <div className={classes.wrapper}>
                <SearchDesktop/>
                {linksToCategoriesJSX}
            </div>
            <div className={`${classes.categoryTree} ${showCategoryTree && categoryTree ? classes.visible : ''}`}>
                {showCategoryTree && categoryTree && (
                    <CategoryTree
                        categoryTree={categoryTree}
                        setShowCategoryTree={setShowCategoryTree}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navigation;
