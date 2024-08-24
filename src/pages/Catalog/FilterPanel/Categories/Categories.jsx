import React, { useState } from 'react';
import { Link } from "react-router-dom";
import classes from './Categories.module.css';
import { ReactComponent as IcoArrow } from '../../../../assets/images/arrows/ico_arrow3.svg';

const Categories = ({ categories }) => {
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    const categoriesJSX = categories.children.map(category => {
        const categoryName = category.name;
        const subcategories = category.children.map(subcategory => (
            <Link key={subcategory.categoryId} to={`/category/${subcategory.categoryId}`}>
                {subcategory.name}
            </Link>
        ));

        const isExpanded = expandedCategories[category.categoryId];

        return (
            <div key={category.categoryId} className={classes.links}>
                <div className={classes.category} onClick={() => toggleCategory(category.categoryId)}>
                    <Link to={`/category/${category.categoryId}`}>
                        {categoryName}
                    </Link>
                    {category.children.length !== 0 && (
                        <div className={`${classes.arrowWrapper} ${isExpanded ? classes.expanded : ''}`}>
                            <IcoArrow />
                        </div>
                    )}
                </div>
                <div className={`${classes.subcategoriesWrapper} ${isExpanded ? classes.expanded : ''}`}>
                    {subcategories}
                </div>
            </div>
        );
    });

    return (
        <div className={classes.wrapper}>
            {categoriesJSX}
        </div>
    );
};

export default Categories;
