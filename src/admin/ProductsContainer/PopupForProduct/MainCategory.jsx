import React, { useEffect, useState } from 'react';
import InputAdmin from "../../Inputs/InputAdmin";
import { useDispatch, useSelector } from "react-redux";
import { searchCategories } from "../../../store/adminSlice";
import SearchPopup from "../../SearchPopup/SearchPopup";

const MainCategory = ({ productData, setProductData }) => {
    const categoriesSearch = useSelector(state => state.admin.categoriesSearch);
    const dispatch = useDispatch();
    const [isOpenPopupCategories, setIsOpenPopupCategories] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(searchCategories(searchTerm));
    }, [searchTerm]);

    const handleSelectCategory = (categoryName) => {
        const handleCategory = categoriesSearch.data.find(category => category.name === categoryName);

        setProductData(prevData => ({
            ...prevData,
            mainCategory: handleCategory,
        }));
        setIsOpenPopupCategories(false);
    };

    return (
        <div>
            <InputAdmin
                onClick={() => setIsOpenPopupCategories(true)}
                onChange={() => {}}
                value={productData.mainCategory.name || ''}
                type='text'
                errors={[]}
                placeholder='Категорія'
                disabled={false}
            />
            {isOpenPopupCategories && (
                <SearchPopup
                    onClosePopup={setIsOpenPopupCategories}
                    search={searchTerm}
                    handleSearch={(e) => setSearchTerm(e.target.value)}
                    content={Array.isArray(categoriesSearch?.data) ? categoriesSearch.data.map(data => data.name) : []}
                    loading={categoriesSearch.loading}
                    onClickValue={handleSelectCategory}
                />
            )}
        </div>
    );
};

export default MainCategory;
