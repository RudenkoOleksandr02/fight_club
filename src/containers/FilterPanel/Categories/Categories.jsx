import React from 'react';

const Categories = ({categories, handleChangeCategory}) => {
    const categoriesJSX = categories.children.map(category => {
        const categoryName = category.name;
        const subcategory = category.children.map(subcategory => {
            return subcategory.name
        })
        return <div>
                <span
                    style={{cursor: 'pointer'}}
                    onClick={() => handleChangeCategory(categoryName)}
                >
                    {categoryName}
                </span>
            <div>{subcategory.map(el => {
                return <div
                    style={{marginLeft: '20px', cursor: 'pointer'}}
                    onClick={() => handleChangeCategory(el)}
                >
                    {el}
                </div>
            })}</div>
        </div>
    })

    return (
        <div>
            {categoriesJSX}
        </div>
    );
};

export default Categories;