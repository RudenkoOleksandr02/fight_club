import React from 'react';
import {Link} from "react-router-dom";

const Categories = ({categories}) => {
    const categoriesJSX = categories.children.map(category => {
        const categoryName = category.name;
        const subcategories = category.children.map(subcategory => {
            return <Link
                to={`/category/${subcategory.categoryId}`}
                style={{marginLeft: '20px', cursor: 'pointer'}}
            >
                {subcategory.name}
            </Link>
        })
        return <div>
            <Link
                style={{cursor: 'pointer'}}
                to={`/category/${category.categoryId}`}
            >
                {categoryName}
            </Link>
            <div>
                {subcategories}
            </div>
        </div>
    })

    return (
        <div>
            {categoriesJSX}
        </div>
    );
};

export default Categories;