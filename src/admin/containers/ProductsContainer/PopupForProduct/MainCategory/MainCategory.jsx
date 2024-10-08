import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {searchMainCategories} from "../../../../../store/adminSlices/adminProductSlice";
import SelectButtonWithPlaceholder from "../../../../buttons/SelectButtonWithPlaceholder/SelectButtonWithPlaceholder";
import ContentWithSearch from "../../../../ContentWithSearch/ContentWithSearch";

const MainCategory = ({productData, setProductData}) => {
    const categoriesSearch = useSelector(state => state.admin.adminProduct.mainCategoriesSearch);
    const dispatch = useDispatch();
    const [isOpenPopupCategories, setIsOpenPopupCategories] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(searchMainCategories(searchTerm));
    }, [searchTerm]);

    const handleSelectCategory = (categoryId) => {
        const handleCategory = categoriesSearch.data.find(category => category.categoryId === categoryId);
        setProductData(prevData => ({
            ...prevData,
            mainCategory: handleCategory,
        }));
        setIsOpenPopupCategories(false);
    };

    return (
        <SelectButtonWithPlaceholder
            title={productData.mainCategory?.name || ''}
            setIsOpenModal={setIsOpenPopupCategories}
            isOpenModal={isOpenPopupCategories}
            content={<ContentWithSearch
                search={searchTerm}
                handleSearch={(e) => setSearchTerm(e.target.value)}
                content={categoriesSearch.data.map(category => ({value: category.name, id: category.categoryId}))}
                loading={categoriesSearch.loading}
                onClickValue={handleSelectCategory}
            />}
            placeholder='Категорія'
        />
    );
};

export default MainCategory;
