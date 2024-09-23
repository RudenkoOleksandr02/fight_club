import React, {useEffect, useState} from 'react';
import classes from "./Categories.module.css";
import Folding from "../../Buttons/Folding/Folding";
import Checkbox from "../../inputs/Checkbox/Checkbox";

const Categories = ({
                        categories,
                        setCategoryIds,
                        categoryIds,
                        isOpen = false,
                        modificationStyle = {
                            color: '_',
                            fontSize1: '20px',
                            fontSize2: '18px',
                            fontWeight1: '500',
                            fontWeight2: '400'
                        }
                    }) => {
    const [localCategories, setLocalCategories] = useState([]);
    useEffect(() => {
        setLocalCategories(categories);
    }, [categories]);

    const [isOpenAllCategories, setIsOpenAllCategories] = useState(isOpen);

    const [isOpenParentCategories, setIsOpenParentCategories] = useState({});
    const handleChangeCategory = (e, categoryId) => {
        if (e.target.checked) {
            setCategoryIds(prevIds => [...prevIds, categoryId]);
        } else {
            setCategoryIds(prevIds => prevIds.filter(id => id !== categoryId));
        }
    };

    const handleClickParentCategory = (categoryId) => {
        setIsOpenParentCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    return (
        <div className={classes.categories}>
            <Folding
                isOpen={isOpenAllCategories}
                handleClick={() => setIsOpenAllCategories(prevState => !prevState)}
                contentBtn='Категорії'
                modificationStyleBtn={{
                    color: modificationStyle.color,
                    fontSize: modificationStyle.fontSize1,
                    fontWeight: modificationStyle.fontWeight1
                }}
                contentDropdown={localCategories.map(parentCategory => (
                    <div key={parentCategory.categoryId}>
                        {parentCategory.children && parentCategory.children.length > 0 ? (
                            <Folding
                                isOpen={isOpenParentCategories[parentCategory.categoryId]}
                                handleClick={() => handleClickParentCategory(parentCategory.categoryId)}
                                contentBtn={
                                    <div className={classes.contentBtn}>
                                        <Checkbox
                                            onChange={e => handleChangeCategory(e, parentCategory.categoryId)}
                                            checked={categoryIds.includes(parentCategory.categoryId)}
                                            style={modificationStyle.color}
                                        />
                                        <span>{parentCategory.name}</span>
                                    </div>
                                }
                                modificationStyleBtn={{
                                    color: modificationStyle.color,
                                    fontSize: modificationStyle.fontSize2,
                                    fontWeight: modificationStyle.fontWeight2
                                }}
                                contentDropdown={parentCategory.children.map(childrenCategory => (
                                    <div key={childrenCategory.categoryId} className={classes.childrenCategory}>
                                        <Checkbox
                                            onChange={e => handleChangeCategory(e, childrenCategory.categoryId)}
                                            checked={categoryIds.includes(childrenCategory.categoryId)}
                                            style={modificationStyle.color}
                                            text={childrenCategory.name}
                                        />
                                    </div>
                                ))}
                            />
                        ) : (
                            <div className={`${classes.contentBtn} ${classes.parentCategory}`}>
                                <Checkbox
                                    onChange={e => handleChangeCategory(e, parentCategory.categoryId)}
                                    checked={categoryIds.includes(parentCategory.categoryId)}
                                    style='_'
                                    text={parentCategory.name}
                                />
                            </div>
                        )}
                    </div>
                ))}
            />
        </div>
    );
};

export default Categories;