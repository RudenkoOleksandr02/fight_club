import React, {useEffect, useState} from 'react';
import classes from './Navigation.module.css';
import SearchDesktop from "../Search/Desktop/SearchDesktop";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategoryTree,
    getPopularProductsByCategory,
    removeCategoryTree,
    removePopularProducts
} from "../../../store/navigationSlice";
import CategoryTree from "./CategoryTree/CategoryTree";
import Preloader from "../../ui/Preloader/Preloader";
import {getParentCategories} from "../../../common/utils/getParentCategory";
import {useNavigate} from "react-router-dom";

const Navigation = () => {
    const {data: categories} = useSelector((state) => state.navigation.categories);
    const {
        data: categoryTreeData,
        loading: categoryTreeLoading
    } = useSelector((state) => state.navigation.categoryTree);
    const {
        data: popularProductsByCategoryData,
        loading: popularProductsByCategoryLoading,
        error: popularProductsByCategoryError
    } = useSelector((state) => state.navigation.popularProductsByCategory);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [showCategoryTree, setShowCategoryTree] = useState(false);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

    useEffect(() => {
        if (currentCategoryId) {
            dispatch(getCategoryTree(currentCategoryId))
                .then(() => {
                    dispatch(getPopularProductsByCategory(currentCategoryId));
                });
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

    const linksParentCategoriesJSX = (
        <div className={classes.mainCategories}>
            {getParentCategories(categories).map(link => (
                <button
                    key={link.categoryId}
                    onMouseEnter={() => handleSetCategoryTree(link.categoryId)}
                    onClick={() => navigate('/category/' + link.categoryId)}
                >
                    {link.name}
                </button>
            ))}
        </div>
    );

    return (
        <>
            <nav
                className={showCategoryTree ? `${classes.navigation} ${classes.fill}` : classes.navigation}
                onMouseLeave={handleDellCategoryTree}
            >
                <div className={classes.mainCategoriesAndSearch}>
                    <div className={classes.search}>
                        <SearchDesktop/>
                    </div>
                    {linksParentCategoriesJSX}
                </div>
                <div className={`${classes.categoryTreeContainer} ${showCategoryTree ? classes.visible : ''}`}>
                    {categoryTreeLoading
                        ? <div className={classes.preloader}>
                            <Preloader color='tertiary' overflowHidden={false}/>
                        </div>
                        : categoryTreeData && (
                        <CategoryTree
                            categoryTree={categoryTreeData}
                            setShowCategoryTree={setShowCategoryTree}
                            selectedSubcategoryId={selectedSubcategoryId}
                            setSelectedSubcategoryId={setSelectedSubcategoryId}
                            popularProductsByCategoryData={popularProductsByCategoryData}
                            popularProductsByCategoryLoading={popularProductsByCategoryLoading}
                            popularProductsByCategoryError={popularProductsByCategoryError}
                        />
                    )
                    }
                </div>
            </nav>
            {showCategoryTree && <div className={classes.overlay} onClick={() => setShowCategoryTree(false)}></div>}
        </>
    );
};

export default Navigation;
