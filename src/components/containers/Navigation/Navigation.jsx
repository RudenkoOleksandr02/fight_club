import React, {useEffect, useState} from 'react';
import classes from './Navigation.module.css';
import {NavLink} from "react-router-dom";
import SearchDesktop from "../Search/Desctop/SearchDesktop";
import {useDispatch, useSelector} from "react-redux";
import {getCategory, getCategoryTree, getPopularProductsByCategory} from "../../../store/navigationSlice";
import CategoryTree from "./CategoryTree/CategoryTree";
import Preloader from "../../ui/Preloader/Preloader";
import {getParentCategories} from "../../../common/utils/getParentCategory";

const Navigation = () => {

    const {
        data: categoryTreeData,
        loading: categoryTreeLoading
    } = useSelector((state) => state.navigation.categoryTree);
    const {
        data: popularProductsByCategoryData,
        loading: popularProductsByCategoryLoading
    } = useSelector((state) => state.navigation.popularProductsByCategory);
    const dispatch = useDispatch();
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [showCategoryTree, setShowCategoryTree] = useState(false);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

    // CATEGORY
    const {data: categories} = useSelector((state) => state.navigation.categories);

    // CATEGORY TREE
    useEffect(() => {
        if (currentCategoryId) {
            dispatch(getCategoryTree(currentCategoryId))
                .then(() => {
                    dispatch(getPopularProductsByCategory(currentCategoryId))
                });
        }
    }, [currentCategoryId, dispatch]);
    const handleSetCategoryTree = (categoryId) => {
        setCurrentCategoryId(categoryId);
        setShowCategoryTree(true);
    };
    const handleDellCategoryTree = () => {
        setCurrentCategoryId(null);
        setShowCategoryTree(false);
    };


    const linksParentCategoriesJSX = (
        <div className={classes.mainCategories}>
            {getParentCategories(categories).map(link => (
                <NavLink
                    key={link.categoryId}
                    to={'/category/' + link.categoryId}
                    onMouseEnter={() => handleSetCategoryTree(link.categoryId)}
                    onClick={() => setShowCategoryTree(false)}
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
                {linksParentCategoriesJSX}
            </div>
            <div className={`${classes.categoryTree} ${showCategoryTree ? classes.visible : ''}`}>
                {categoryTreeLoading
                    ? <div className={classes.preloader}>
                        <Preloader color='tertiary' overflowHidden={false}/>
                    </div>
                    : <CategoryTree
                        selectedSubcategoryId={selectedSubcategoryId}
                        setSelectedSubcategoryId={setSelectedSubcategoryId}
                        categoryTree={categoryTreeData}
                        setShowCategoryTree={setShowCategoryTree}
                        popularProductsByCategoryData={popularProductsByCategoryData}
                        popularProductsByCategoryLoading={popularProductsByCategoryLoading}
                    />}
            </div>
        </nav>
    );
};

export default Navigation;
