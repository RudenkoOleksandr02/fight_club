import React, {useEffect, useState} from 'react';
import classes from "../Products.module.css";
import PrimaryButton from "../../../buttons/PrimaryButton/PrimaryButton";
import ContentWithSearch from "../../../ContentWithSearch/ContentWithSearch";
import ButtonWithModal from "../../../buttons/ButtonWithModal/ButtonWithModal";
import {ReactComponent as IcoPlus} from '../../../images/icoPlus.svg';
import {useDispatch, useSelector} from "react-redux";
import {getProductsBySearch} from "../../../../store/adminSlices/adminBlogSlice";

const AddProduct = ({setProductsIds}) => {
    const {productsSearch: {data: productsSearchData, loading: productsSearchLoading}} = useSelector(state => state.admin.adminBlog);
    const dispatch = useDispatch();

    const [isOpenPopupSearch, setIsOpenPopupSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getProductsBySearch(searchTerm))
    }, [searchTerm])

    const handleSelectProduct = (productId) => {
        setProductsIds(productsSearchData.products, productId);
        setIsOpenPopupSearch(false);
    };

    return (
        <ButtonWithModal
            button={
                <div className={classes.btn}>
                    <PrimaryButton handleClick={() => setIsOpenPopupSearch(prevState => !prevState)}>
                        Додати існуючу <IcoPlus/>
                    </PrimaryButton>
                </div>
            }
            contentForModal={
                <ContentWithSearch
                    search={searchTerm}
                    handleSearch={(e) => setSearchTerm(e.target.value)}
                    content={productsSearchData.products?.map(product => ({value: product.name, id: product.id}))}
                    loading={productsSearchLoading}
                    onClickValue={handleSelectProduct}
                />
            }
            isOpenModal={isOpenPopupSearch}
            setIsOpenModal={setIsOpenPopupSearch}
        />
    );
};

export default AddProduct;