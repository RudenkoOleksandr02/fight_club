import React, {useEffect, useState} from 'react';
import classes from "./AdditionalCategories.module.css";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as IcoPlus} from './../../../../images/icoPlus.svg';
import {searchAdditionalCategories} from "../../../../../store/adminSlices/adminProductSlice";
import ButtonWithModal from "../../../../buttons/ButtonWithModal/ButtonWithModal";
import PrimaryButton from "../../../../buttons/PrimaryButton/PrimaryButton";
import ContentWithSearch from "../../../../ContentWithSearch/ContentWithSearch";

const AddCategories = ({setProductData,  mainCategoryId}) => {
    const categoriesSearch = useSelector(state => state.admin.adminProduct.additionalCategoriesSearch);
    const [isOpenPopupCategories, setIsOpenPopupCategories] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (mainCategoryId !== undefined) {
            dispatch(searchAdditionalCategories(searchTerm, mainCategoryId));
        }
    }, [searchTerm, mainCategoryId]);
    const handleSelectCategory = (categoryId) => {
        const handleCategories = categoriesSearch.data.find(category => category.categoryId === categoryId)
        setProductData(prevState => ({
            ...prevState,
            additionalCategories: [...prevState.additionalCategories, handleCategories],
        }));
        setIsOpenPopupCategories(false);
    };

    return (
        <ButtonWithModal
            button={
                <div className={classes.btn}>
                    <PrimaryButton handleClick={() => setIsOpenPopupCategories(prevState => !prevState)}>
                        Додати існуючу <IcoPlus/>
                    </PrimaryButton>
                </div>
            }
            contentForModal={
                <ContentWithSearch
                    search={searchTerm}
                    handleSearch={(e) => setSearchTerm(e.target.value)}
                    content={categoriesSearch.data.map(category => ({value: category.name, id: category.categoryId}))}
                    loading={categoriesSearch.loading}
                    onClickValue={handleSelectCategory}
                />
            }
            isOpenModal={isOpenPopupCategories}
            setIsOpenModal={setIsOpenPopupCategories}
        />
    );
};

export default AddCategories;