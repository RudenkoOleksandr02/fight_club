import React from 'react';
import { useNavigate } from "react-router-dom";
import classes from "./SubcategoriesWithButton.module.css";
import SecondaryButton from "../../../../ui/Buttons/SecondaryButton/SecondaryButton";
import PlusButton from "./PlusButton/PlusButton";

const SubcategoriesWithButton = ({ subcategories, setShowCategoryTree, handlePlusButtonClick }) => {
    const navigate = useNavigate();

    const subcategoriesWithButtonJSX = subcategories.map(subcategory => (
        <div className={classes.subcategoryWithButton} key={subcategory.subcategoryId}>
            <SecondaryButton
                handleClick={() => {
                    setShowCategoryTree(false);
                    navigate(`/category/${subcategory.subcategoryId}`);
                }}
            >
                {subcategory.subcategoryName}
            </SecondaryButton>
            {subcategory.underSubcategories.length !== 0 && (
                <PlusButton
                    handleClick={() => handlePlusButtonClick(subcategory.subcategoryId)}
                    isOpen={subcategory.isOpen}
                />
            )}
        </div>
    ));

    return <div>{subcategoriesWithButtonJSX}</div>;
};

export default SubcategoriesWithButton;
