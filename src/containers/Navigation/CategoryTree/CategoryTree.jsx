import React, { useState } from 'react';
import classes from './CategoryTree.module.css';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../../assets/images/arrows/ico_arrow3.svg";
import SecondaryButton from "../../../ui/components/Buttons/SecondaryButton/SecondaryButton";

const CategoryTree = ({ categoryTree, handleSetCategoryTree, handleDellCategoryTree }) => {
    const [activeSubcategories, setActiveSubcategories] = useState([]);
    const navigate = useNavigate();

    const handleButtonClick = (subcategory) => {
        if (activeSubcategories.includes(subcategory)) {
            setActiveSubcategories(activeSubcategories.filter(active => active !== subcategory));
        } else {
            setActiveSubcategories([...activeSubcategories, subcategory]);
        }
    };

    const categoryTreeJSX = categoryTree && categoryTree.children ? categoryTree.children.map(subcategory => {
        return (
            <div key={uuidv4()} className={classes.categoriesWrapper}>
                <div className={classes.subcategoryWithButton}>
                    <SecondaryButton
                        handleClick={() => navigate(`/category/${subcategory.categoryId}`)}
                    >
                        {subcategory.name}
                    </SecondaryButton>
                    {subcategory.children.length !== 0 && (
                        <button
                            onClick={() => handleButtonClick(subcategory)}
                            className={classes.showMore}
                        >
                            <Arrow />
                        </button>
                    )}
                </div>
                {activeSubcategories.includes(subcategory) && (
                    <div className={classes.underSubcategory}>
                        {subcategory.children.map(child => (
                            <Link key={uuidv4()} to={`/category/${child.categoryId}`}>
                                {child.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }) : <div>preloader...</div>;

    return (
        <div className={classes.wrapper} onMouseEnter={handleSetCategoryTree} onMouseLeave={handleDellCategoryTree}>
            {categoryTreeJSX}
        </div>
    );
};

export default CategoryTree;
