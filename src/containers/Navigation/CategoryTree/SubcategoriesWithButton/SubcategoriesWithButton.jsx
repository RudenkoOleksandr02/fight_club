import React from 'react';
import classes from "./SubcategoriesWithButton.module.css";
import SecondaryButton from "../../../../ui/components/Buttons/SecondaryButton/SecondaryButton";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

const SubcategoriesWithButton = ({
                                     categoryTree,
                                     handleButtonClick,
                                     selectedUnderSubcategory,
                                     setShowCategoryTree
                                 }) => {
    const navigate = useNavigate();

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

    return (
        <div>
            {subcategoriesWithButtonJSX}
        </div>
    );
};

export default SubcategoriesWithButton;