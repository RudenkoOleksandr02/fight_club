import React, {useEffect, useState} from 'react';
import classes from './CategoryTree.module.css';
import {getPopularProductsByCategory} from '../../../store/homePageSlice'
import {useDispatch, useSelector} from "react-redux";
import PopularProducts from "./PopularProducts/PopularProducts";
import SubcategoriesWithButton from "./SubcategoriesWithButton/SubcategoriesWithButton";
import UnderSubcategory from "./UnderSubcategory/UnderSubcategory";

const CategoryTree = ({categoryTree, setShowCategoryTree}) => {
    const popularProducts = useSelector((state) => state.homePageData.popularProductsByCategory);
    const dispatch = useDispatch();
    const [selectedUnderSubcategory, setSelectedUnderSubcategory] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categoryTree.categoryId) {
            setLoading(true);
            dispatch(getPopularProductsByCategory(categoryTree.categoryId)).then(() => {
                setLoading(false);
            });
        }
    }, [categoryTree.categoryId]);

    const handleButtonClick = (subcategory) => {
        if (subcategory.categoryId !== selectedUnderSubcategory.subcategoryId) {
            setSelectedUnderSubcategory({
                mainCategoryId: categoryTree.categoryId,
                subcategoryId: subcategory.categoryId,
                underSubcategory: subcategory.children
            })
        } else {
            setSelectedUnderSubcategory({})
        }
    };

    return <div
        className={classes.wrapper}
        onMouseEnter={() => setShowCategoryTree(true)}
    >
        <div className={classes.leftSide}>
            <SubcategoriesWithButton
                categoryTree={categoryTree}
                handleButtonClick={handleButtonClick}
                selectedUnderSubcategory={selectedUnderSubcategory}
                setSelectedUnderSubcategory={setSelectedUnderSubcategory}
                setShowCategoryTree={setShowCategoryTree}
            />
        </div>
        <div className={classes.rightSide}>
            <UnderSubcategory
                selectedUnderSubcategory={selectedUnderSubcategory}
                mainCategoryId={categoryTree.categoryId}
            />
            <PopularProducts
                mainCategoryName={categoryTree.name}
                popularProducts={popularProducts}
                loading={loading}
            />
        </div>
    </div>
}

export default CategoryTree;
