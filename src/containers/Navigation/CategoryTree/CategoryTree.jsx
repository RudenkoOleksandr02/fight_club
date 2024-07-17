import React, {useEffect, useState} from 'react';
import classes from './CategoryTree.module.css';
import {v4 as uuidv4} from 'uuid';
import {Link, useNavigate} from "react-router-dom";
import SecondaryButton from "../../../ui/components/Buttons/SecondaryButton/SecondaryButton";
import {getPopularProductsByCategory} from '../../../store/homePageSlice'
import {useDispatch, useSelector} from "react-redux";
import PopularProducts from "./PopularProducts/PopularProducts";

const CategoryTree = ({categoryTree, setShowCategoryTree}) => {
    const [selectedUnderSubcategory, setSelectedUnderSubcategory] = useState({});
    const navigate = useNavigate();
    const popularProducts = useSelector((state) => state.homePageData.popularProductsByCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopularProductsByCategory(categoryTree.categoryId))
    }, [categoryTree.categoryId])

    const handleButtonClick = (subcategory) => {
        if (subcategory.categoryId !== selectedUnderSubcategory.subcategoryId) {
            setSelectedUnderSubcategory({
                subcategoryId: subcategory.categoryId,
                underSubcategory: subcategory.children
            })
        } else {
            setSelectedUnderSubcategory({})
        }
    };

    const subcategoriesWithButtonJSX = categoryTree?.children?.map(subcategory => {
        return <div className={classes.subcategoryWithButton} key={uuidv4()}>
            <SecondaryButton
                handleClick={() => {
                    setShowCategoryTree(false)
                    navigate(`/category/${subcategory.categoryId}`)
                }}>
                {subcategory.name}
            </SecondaryButton>
            {subcategory.children.length !== 0 && (
                <button
                    onClick={() => handleButtonClick(subcategory)}
                    className={classes.showMore}>
                    <span
                        className={`${classes.verticalLine} ${subcategory.categoryId === selectedUnderSubcategory.subcategoryId ? classes.rotated : ''}`}>
                    </span>
                    <span className={classes.horizontalLine}></span>
                </button>
            )}
        </div>
    });

    const underSubcategoryJSX = (
        <div className={classes.underSubcategories}>
            {selectedUnderSubcategory?.underSubcategory?.map(underSubcategory => {
                return <Link key={uuidv4()} to={`/category/${underSubcategory.categoryId}`}>
                    {underSubcategory.name}
                </Link>
            })}
        </div>
    )

    return <div
        className={classes.wrapper}
        onMouseLeave={() => setShowCategoryTree(false)}
    >
        <div className={classes.leftSide}>
            {subcategoriesWithButtonJSX}
        </div>
        <div className={classes.rightSide}>
            {underSubcategoryJSX}
            <PopularProducts
                mainCategoryName={categoryTree.name}
                popularProducts={popularProducts}
            />
        </div>
    </div>
}

export default CategoryTree;
