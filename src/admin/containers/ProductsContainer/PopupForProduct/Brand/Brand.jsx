import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAdminBrandsBySearch} from "../../../../../store/adminSlices/adminBrandsSlice";
import ContentWithSearch from "../../../../ContentWithSearch/ContentWithSearch";
import SelectButtonWithPlaceholder from "../../../../buttons/SelectButtonWithPlaceholder/SelectButtonWithPlaceholder";

const Brand = ({productData, setProductData}) => {
    const brandsSearch = useSelector(state => state.admin.adminBrands.brandsSearch);
    const dispatch = useDispatch();
    const [isOpenPopupBrands, setIsOpenPopupBrands] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getAdminBrandsBySearch(searchTerm));
    }, [searchTerm]);

    const handleSelectBrand = (brandId) => {
        const handleBrand = brandsSearch.data.find(brand => brand.brandId === brandId);
        setProductData(prevData => ({
            ...prevData,
            brand: handleBrand
        }));
        setIsOpenPopupBrands(false);
    };

    return (
        <SelectButtonWithPlaceholder
            title={productData.brand?.title || ''}
            setIsOpenModal={setIsOpenPopupBrands}
            isOpenModal={isOpenPopupBrands}
            content={<ContentWithSearch
                search={searchTerm}
                handleSearch={(e) => setSearchTerm(e.target.value)}
                content={brandsSearch.data.map(brand => ({value: brand.title, id: brand.brandId}))}
                loading={brandsSearch.loading}
                onClickValue={handleSelectBrand}
            />}
            placeholder='Бренд'
        />
    );
};

export default Brand;