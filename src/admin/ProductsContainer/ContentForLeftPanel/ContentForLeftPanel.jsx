import React, {useEffect, useState} from 'react';
import classes from './ContentForLeftPanel.module.css';
import {ReactComponent as IcoArrow} from './../../images/icoArrow.svg';
import {getParentCategories} from "../../../common/utils/getParentCategory";

const ContentForLeftPanel = ({category, categoryId, setCategoryId}) => {
    // CATEGORIES
    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [isOpenParentCategories, setIsOpenParentCategories] = useState([]);
    const [childrenCategories, setChildrenCategories] = useState([]);
    useEffect(() => {
        setIsOpenParentCategories(getParentCategories(category.data).map(parentCategory => ({
            categoryId: parentCategory.categoryId,
            isOpen: false
        })));
    }, [category]);
    const handleClickParentCategory = (parentId) => {
        getChildrenCategories(parentId);
        setIsOpenParentCategories(prevState => {
            return prevState.map(cat => cat.categoryId === parentId
                ? {...cat, isOpen: !cat.isOpen}
                : {...cat, isOpen: false}
            );
        });
    }
    const getChildrenCategories = (parentId) => {
        setChildrenCategories(category.data.filter(category => (
            category.parentCategoryId === parentId
        )));
    }
    const handleChangeCategory = (e, categoryId) => {
        if (e.target.checked) {
            setCategoryId(categoryId);
        } else {
            setCategoryId(null);
        }
    }
    const categoriesJSX = (
        <div className={classes.inner}>
            <div className={classes.folding} onClick={() => setIsOpenCategories(prevState => !prevState)}>
                <span className={classes.title}>Категорії</span>
                <span className={`${classes.ico} ${isOpenCategories ? classes.isOpen : ''}`}>
                    <IcoArrow/>
                </span>
            </div>
            {isOpenCategories && (
                <div className={classes.parentCategories}>
                    {getParentCategories(category.data).map(parentCategory => (
                        <React.Fragment key={parentCategory.categoryId}>
                            <div className={classes.wrappFolding}>
                                <input
                                    type='checkbox'
                                    name='checkbox'
                                    checked={categoryId === parentCategory.categoryId}
                                    onChange={e => handleChangeCategory(e, parentCategory.categoryId)}
                                />
                                <div
                                    className={classes.folding}
                                    onClick={() => handleClickParentCategory(parentCategory.categoryId)}
                                >
                                    <span className={classes.title}>{parentCategory.name}</span>
                                    <span
                                        className={`${classes.ico} ${isOpenParentCategories.find(cat => cat.categoryId === parentCategory.categoryId)?.isOpen ? classes.isOpen : ''}`}>
                                        <IcoArrow/>
                                    </span>
                                </div>
                            </div>
                            {isOpenParentCategories.find(cat => cat.categoryId === parentCategory.categoryId)?.isOpen && (
                                <div className={classes.childrenCategories}>
                                    {childrenCategories.map(category => (
                                        <div key={category.categoryId}>
                                            <input
                                                type='checkbox'
                                                name='checkbox'
                                                checked={categoryId === category.categoryId}
                                                onChange={e => handleChangeCategory(e, category.categoryId)}
                                            />
                                            <span>{category.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );

    // CHARACTERISTICS

    return (
        <div className={classes.wrapper}>
            {categoriesJSX}
        </div>
    );
};

export default ContentForLeftPanel;
