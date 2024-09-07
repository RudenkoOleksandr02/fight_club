import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from './CategoryTree.module.css';
import {getPopularProductsByCategory} from '../../../../store/pageSlices/homePageSlice';
import PopularProducts from "./PopularProducts/PopularProducts";
import SubcategoriesWithButton from "./SubcategoriesWithButton/SubcategoriesWithButton";
import UnderSubcategory from "./UnderSubcategory/UnderSubcategory";
import Preloader from "../../../ui/Preloader/Preloader";

const CategoryTree = ({
                          categoryTree,
                          setShowCategoryTree,
                          selectedSubcategoryId,
                          setSelectedSubcategoryId,
                          popularProductsByCategoryData,
                          popularProductsByCategoryLoading
                      }) => {
    const [subcategories, setSubcategories] = useState(categoryTree.children.map(subcategory => {
        return {
            subcategoryId: subcategory.categoryId,
            subcategoryName: subcategory.name,
            isOpen: false,
            underSubcategories: subcategory.children.map(underSubcategory => {
                return {
                    underSubcategoryId: underSubcategory.categoryId,
                    underSubcategoryName: underSubcategory.name
                }
            })
        }
    }));

    useEffect(() => {
        if (categoryTree.categoryId) {
            setSubcategories(subcategories.map(subcategory => {
                if (subcategory.subcategoryId === selectedSubcategoryId) {
                    return {
                        ...subcategory,
                        isOpen: true
                    }
                } else {
                    return subcategory
                }
            }))
        }
    }, [categoryTree.categoryId])

    const handlePlusButtonClick = (subcategoryId) => {
        setSelectedSubcategoryId(prevValue => {
            if (prevValue === subcategoryId) {
                return null;
            } else {
                return subcategoryId
            }
        });
        setSubcategories(subcategories.map(subcategory => {
            if (subcategoryId === subcategory.subcategoryId) {
                return {
                    ...subcategory,
                    isOpen: !subcategory.isOpen
                }
            } else {
                return {
                    ...subcategory,
                    isOpen: false
                }
            }
        }))
    }

    return (
        <div className={classes.wrapper} onMouseEnter={() => setShowCategoryTree(true)}>
            <div className={classes.leftSide}>
                <SubcategoriesWithButton
                    subcategories={subcategories}
                    setShowCategoryTree={setShowCategoryTree}
                    handlePlusButtonClick={handlePlusButtonClick}
                />
            </div>
            <div className={classes.rightSide}>
                <UnderSubcategory
                    subcategories={subcategories}
                    setShowCategoryTree={setShowCategoryTree}
                />
                <PopularProducts
                    mainCategoryName={categoryTree.name}
                    popularProducts={popularProductsByCategoryData}
                    setShowCategoryTree={setShowCategoryTree}
                    popularProductsByCategoryLoading={popularProductsByCategoryLoading}
                />
            </div>
        </div>
    )
};

export default CategoryTree;
