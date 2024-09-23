import React, {useEffect, useState} from 'react';
import classes from './CategoryTree.module.css';
import PopularProducts from "./PopularProducts/PopularProducts";
import SubcategoriesWithButton from "./SubcategoriesWithButton/SubcategoriesWithButton";
import UnderSubcategory from "./UnderSubcategory/UnderSubcategory";

const CategoryTree = ({
                          categoryTree,
                          setShowCategoryTree,
                          selectedSubcategoryId,
                          setSelectedSubcategoryId,
                          popularProductsByCategoryData,
                          popularProductsByCategoryLoading,
                          popularProductsByCategoryError
                      }) => {
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        if (categoryTree && categoryTree.children) {
            const newSubcategories = categoryTree.children.map(subcategory => ({
                subcategoryId: subcategory.categoryId,
                subcategoryName: subcategory.name,
                isOpen: false,
                underSubcategories: subcategory.children.map(underSubcategory => ({
                    underSubcategoryId: underSubcategory.categoryId,
                    underSubcategoryName: underSubcategory.name
                }))
            }));
            setSubcategories(newSubcategories);
            setSelectedSubcategoryId(null);
        } else {
            setSubcategories([]);
        }
    }, [categoryTree]);

    useEffect(() => {
        setSubcategories(prevSubcategories => prevSubcategories.map(subcategory => {
            if (subcategory.subcategoryId === selectedSubcategoryId) {
                return {
                    ...subcategory,
                    isOpen: true
                };
            } else {
                return {
                    ...subcategory,
                    isOpen: false
                };
            }
        }));
    }, [selectedSubcategoryId]);

    const handlePlusButtonClick = (subcategoryId) => {
        setSelectedSubcategoryId(prevValue => {
            if (prevValue === subcategoryId) {
                return null;
            } else {
                return subcategoryId;
            }
        });
    };

    if (!categoryTree || !categoryTree.children) {
        return null;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.leftSide}>
                <SubcategoriesWithButton
                    subcategories={subcategories}
                    setShowCategoryTree={setShowCategoryTree}
                    handlePlusButtonClick={handlePlusButtonClick}
                />
            </div>
            <div className={classes.rightSide}>
                <PopularProducts
                    mainCategoryName={categoryTree.name}
                    popularProducts={popularProductsByCategoryData}
                    setShowCategoryTree={setShowCategoryTree}
                    popularProductsByCategoryLoading={popularProductsByCategoryLoading}
                    popularProductsByCategoryError={popularProductsByCategoryError}
                />
                <UnderSubcategory
                    subcategories={subcategories}
                    setShowCategoryTree={setShowCategoryTree}
                />
            </div>
        </div>
    );
};

export default CategoryTree;
