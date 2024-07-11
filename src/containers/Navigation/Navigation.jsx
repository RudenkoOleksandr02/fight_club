import React, {useEffect, useState} from 'react';
import classes from './Navigation.module.css';
import {v4 as uuidv4} from 'uuid';
import {NavLink} from "react-router-dom";
import SearchDesktop from "../../ui/components/Search/Desctop/SearchDesktop";
import linksToCategories from '../../data/linksToCategories.json'
import {useDispatch, useSelector} from "react-redux";
import {getCategoryTree} from "../../store/categorySlice";
import Die from "./Die/Die";

const Navigation = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const categoryTree = useSelector((state) => state.categoryData.categoryTree);
    const dispatch = useDispatch();

    const handleSetCategoryTree = (categoryName) => {
       setCurrentCategory(categoryName);
    }
    const handleDellCategoryTree = () => {
        setCurrentCategory(null);
    }

    useEffect(() => {
        if (currentCategory) {
            dispatch(getCategoryTree(currentCategory))
        }
    }, [currentCategory])


    const linksToCategoriesJSX = <div className={classes.categories}>
        {linksToCategories.map(link => {
            return <NavLink
                key={uuidv4()}
                to={link.id}
                onMouseOver={() => handleSetCategoryTree(link.name)}
            >
                {link.name}
            </NavLink>
        })}
    </div>

    return (
        <nav className={classes.navigation}>
            <div className={classes.wrapper}>
                <SearchDesktop/>
                {linksToCategoriesJSX}
            </div>
            {currentCategory && categoryTree.length !== 0 && <Die categoryTree={categoryTree}/>}
        </nav>
    );
};

export default Navigation;