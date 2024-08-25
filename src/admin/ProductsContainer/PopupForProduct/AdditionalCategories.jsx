import React, {useEffect, useState} from 'react';
import classes from "./PopupForProduct.module.css";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import Table from "../../Table/Table";
import Tr from "../../Table/Tr";
import Td from "../../Table/Td";
import IcoButton from "../../buttons/IcoButton/IcoButton";
import {useDispatch, useSelector} from "react-redux";
import {searchCategories} from "../../../store/adminSlice";
import {ReactComponent as IcoPlus} from './../../images/icoPlus.svg';
import {ReactComponent as IcoDelete} from './../../images/icoDelete.svg';
import SearchPopup from "../../SearchPopup/SearchPopup";

const AdditionalCategories = ({productData, setProductData}) => {
    const categoriesSearch = useSelector(state => state.admin.categoriesSearch);
    const dispatch = useDispatch();
    const [isOpenPopupCategories, setIsOpenPopupCategories] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(searchCategories(searchTerm));
    }, [searchTerm, dispatch]);

    const handleSelectCategory = (name) => {
        const handleCategories = categoriesSearch.data.find(category => category.name === name)
        if (handleCategories) {
            setProductData(prevData => ({
                ...prevData,
                additionalCategories: [...prevData.additionalCategories, handleCategories],
            }));
        }
        setIsOpenPopupCategories(false);
    };

    const handleDeleteCategory = (categoryId) => {
        setProductData(prevData => ({
            ...prevData,
            additionalCategories: prevData.additionalCategories.filter(category => category.categoryId !== categoryId),
        }));
    };

    return (
        <div className={classes.additionalCategoriesWrapper + ' ' + classes.die}>
            <span>Під категорії</span>
            <div className={classes.inner}>
                <div className={classes.btns}>
                    <PrimaryButton handleClick={() => setIsOpenPopupCategories(true)}>Додати
                        існуючу <IcoPlus/></PrimaryButton>
                </div>
                <Table>
                    {!!productData.additionalCategories.length ? productData.additionalCategories.map((category, index) => (
                        <Tr key={index} templateColumns='1fr 44px'>
                            <Td justifyContent='left'>{category.name}</Td>
                            <Td>
                                <IcoButton
                                    svgIco={<IcoDelete/>}
                                    onClick={() => handleDeleteCategory(category.categoryId)}
                                />
                            </Td>
                        </Tr>
                    )) : null}
                </Table>
            </div>
            {isOpenPopupCategories && (
                <SearchPopup
                    onClosePopup={setIsOpenPopupCategories}
                    search={searchTerm}
                    handleSearch={(e) => setSearchTerm(e.target.value)}
                    content={Array.isArray(categoriesSearch?.data) ? categoriesSearch.data.map(el => {
                        return el.name;
                    }) : []}
                    loading={categoriesSearch.loading}
                    onClickValue={handleSelectCategory}
                />
            )}
        </div>
    );
};

export default AdditionalCategories;
