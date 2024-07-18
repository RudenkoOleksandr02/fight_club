import React from 'react';
import classes from "./UnderSubcategory.module.css";
import {Link} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

const UnderSubcategory = ({selectedUnderSubcategory, mainCategoryId}) => {
    const hasUnderSubcategories = (
        mainCategoryId === selectedUnderSubcategory.mainCategoryId
        && selectedUnderSubcategory
        && Object.keys(selectedUnderSubcategory).length > 0
    )

    const underSubcategoryJSX = (
        selectedUnderSubcategory?.underSubcategory?.map(underSubcategory => {
            return <Link key={uuidv4()} to={`/category/${underSubcategory.categoryId}`}>
                {underSubcategory.name}
            </Link>
        })
    )

    if (!hasUnderSubcategories) {
        return null;
    }

    return (
        <div className={classes.underSubcategories}>
            {underSubcategoryJSX}
        </div>
    );
}
export default UnderSubcategory;