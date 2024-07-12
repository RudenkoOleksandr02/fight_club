import React, {useState} from 'react';
import classes from './Die.module.css';
import {v4 as uuidv4} from 'uuid'
import {Link} from "react-router-dom";

const Die = ({ categoryTree }) => {
    const [activeSubcategories, setActiveSubcategories] = useState([]);

    const handleButtonClick = (subcategory) => {
        if (activeSubcategories.includes(subcategory)) {
            setActiveSubcategories(activeSubcategories.filter(active => active !== subcategory));
        } else {
            setActiveSubcategories([...activeSubcategories, subcategory]);
        }
    };

    const categoryTreeJSX = categoryTree.children.map(subcategory => {
        return (
            <div key={uuidv4()} className={classes.subcategory}>
                {subcategory.children.length !== 0 && (
                    <button onClick={() => handleButtonClick(subcategory)}>
                        more
                    </button>
                )}
                <Link to={`/category/${subcategory.categoryId}`}>{subcategory.name}</Link>
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
    });

    return <div className={classes.wrapper}>{categoryTreeJSX}</div>;
};

export default Die;