import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from './ProductsContainer.module.css';
import {
    deleteProductById,
    getProductById,
    getProductsByAdminFilter,
    importFromExcel
} from "../../../store/adminSlices/adminProductSlice";
import {useImportState} from "../../../common/hooks/useImportState";
import {useHandlePostFile} from "../../../common/hooks/useHandlePostFile";
import TopPanel from "../../TopPanel/TopPanel";
import SortButton from "./SortButton/SortButton";
import SecondaryButton from "../../buttons/SecondaryButton/SecondaryButton";
import LeftPanel from "../../LeftPanel/LeftPanel";
import FilterPanel from "./FilterPanel/FilterPanel";
import SelectButton from "../../buttons/SelectButton/SelectButton";
import Popup from "../../../components/ui/Popup/Popup";
import FileDropzone from "../../FileDropzone/FileDropzone";
import SearchAdmin from "../../SearchAdmin/SearchAdmin";
import ProductsTable from "./ProductsTable/ProductsTable";
import EditProduct from "./EditProduct/EditProduct";
import BottomPanel from "../../BottomPanel/BottomPanel";
import AddProduct from "./AddProduct/AddProduct";

const ProductsContainer = ({currentPage, setCurrentPage, amount, setAmount}) => {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state.admin.adminProduct);

    // POPUP
    const [isOpenLeftPanel, setIsOpenLeftPanel] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenPopupImportFile, setIsOpenPopupImportFile] = useState(false);
    const [isOpenPopupAddProducts, setIsOpenPopupAddProducts] = useState(false);
    const [isOpenPopupProductEdit, setIsOpenPopupProductEdit] = useState(false);
    const [isOpenPopupAddProduct, setIsOpenPopupAddProduct] = useState(false);

    // FILTER AND SORT
    const [sortOption, setSortOption] = useState('');
    const handleSortOption = (option) => {
        if (sortOption === `${option}_asc`) {
            setSortOption(`${option}_desc`);
        } else {
            setSortOption(`${option}_asc`);
        }
    };
    const [searchTerm, setSearchTerm] = useState('');
    const handleCloseSearchAdmin = () => {
        setSearchTerm('');
        setIsOpenSearch(false);
    }
    const [categoryIds, setCategoryIds] = useState([]);
    const [characteristicIds, setCharacteristicIds] = useState([]);
    const [brandIds, setBrandIds] = useState([]);
    const [isShown, setIsShown] = useState(null);
    const [isHit, setIsHit] = useState(null);
    const [hasDiscount, setHasDiscount] = useState(null);
    const [isNew, setIsNew] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    useEffect(() => {
        dispatch(getProductsByAdminFilter({
            amount,
            start: (currentPage - 1) * amount,
            sortOption,
            searchTerm,
            categoryIds,
            selectedCharacteristics: characteristicIds,
            brandIds,
            minPrice,
            maxPrice,
            isShown,
            isHit,
            hasDiscount,
            isNew
        }));
    }, [currentPage, amount, sortOption, searchTerm, categoryIds, brandIds, characteristicIds, minPrice, maxPrice, isShown, isHit, hasDiscount, isNew]);

    // IMPORT FILE
    const {
        isErrorImport,
        isSuccessImport,
        setIsErrorImport,
        setIsSuccessImport,
        resetImportState
    } = useImportState();
    const handleSendFile = useHandlePostFile(setIsErrorImport, setIsSuccessImport, importFromExcel);

    // EDIT PRODUCT
    const handleClickEdit = (productId) => {
        dispatch(getProductById(productId));
        setIsOpenPopupProductEdit(true);
    }

    // DELETE PRODUCT
    const handleDeleteProductById = (productId) => {
        dispatch(deleteProductById(productId))
            .then(() => dispatch(getProductsByAdminFilter({
                    amount,
                    start: (currentPage - 1) * amount,
                    sortOption,
                    searchTerm,
                    categoryIds,
                    selectedCharacteristics: characteristicIds,
                    brandIds,
                    minPrice,
                    maxPrice,
                    isShown,
                    isHit,
                    hasDiscount,
                    isNew
                }))
            )
    }

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={products.data.totalCount || 0}
                setCurrentPage={setCurrentPage}
            >
                {/* SORT */}
                <SortButton
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    handleSortOption={handleSortOption}
                />

                {/* FILTER */}
                <SecondaryButton handleClick={() => setIsOpenLeftPanel(true)}>Фільтрувати</SecondaryButton>
                <LeftPanel isOpen={isOpenLeftPanel} onClose={() => setIsOpenLeftPanel(false)}>
                    <FilterPanel
                        categoryIds={categoryIds}
                        setCategoryIds={setCategoryIds}
                        characteristicIds={characteristicIds}
                        setCharacteristicIds={setCharacteristicIds}
                        isShown={isShown}
                        setIsShown={setIsShown}
                        isHit={isHit}
                        setIsHit={setIsHit}
                        isNew={isNew}
                        setIsNew={setIsNew}
                        hasDiscount={hasDiscount}
                        setHasDiscount={setHasDiscount}
                        setMinPrice={setMinPrice}
                        minPrice={minPrice}
                        setMaxPrice={setMaxPrice}
                        maxPrice={maxPrice}
                        brandIds={brandIds}
                        setBrandIds={setBrandIds}
                    />
                </LeftPanel>

                {/* IMPORT PRODUCT */}
                <SelectButton
                    title='Додати товари'
                    content={<>
                        <button onClick={() => setIsOpenPopupImportFile(true)}>Імпортувати товари</button>
                        <button onClick={() => setIsOpenPopupAddProduct(true)}>Додати товар вручну</button>
                    </>}
                    setIsOpenModal={setIsOpenPopupAddProducts}
                    isOpenModal={isOpenPopupAddProducts}
                />
                {isOpenPopupImportFile && (
                    <Popup onClose={() => setIsOpenPopupImportFile(false)}>
                        <FileDropzone
                            accepts={[
                                'application/vnd.ms-excel',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            ]}
                            handleSend={handleSendFile}
                            maxFiles={1}
                            isError={isErrorImport}
                            isSuccess={isSuccessImport}
                            setIsError={setIsErrorImport}
                            setIsSuccess={setIsSuccessImport}
                        />
                    </Popup>
                )}

                {/* ADD PRODUCT */}
                <AddProduct
                    isOpenPopupAddProduct={isOpenPopupAddProduct}
                    setIsOpenPopupAddProduct={setIsOpenPopupAddProduct}
                    currentPage={currentPage}
                    amount={amount}
                    searchTerm={searchTerm}
                />

                {/* SEARCH */}
                <SearchAdmin
                    value={searchTerm}
                    handleChange={e => setSearchTerm(e.target.value)}
                    isOpen={isOpenSearch}
                    onClose={handleCloseSearchAdmin}
                    onOpen={() => setIsOpenSearch(true)}
                />
            </TopPanel>
            {/* SORT AND TABLE */}
            <ProductsTable
                handleClickEdit={handleClickEdit}
                sortOption={sortOption}
                handleSortOption={handleSortOption}
                handleDeleteProductById={handleDeleteProductById}
            />
            {/* EDIT PRODUCT */}
            <EditProduct
                isOpenPopupProductEdit={isOpenPopupProductEdit}
                setIsOpenPopupProductEdit={setIsOpenPopupProductEdit}
                currentPage={currentPage}
                amount={amount}
                searchTerm={searchTerm}
            />
            {/* BOTTOM PANEL */}
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                setAmount={setAmount}
                totalCount={products.data.totalCount || 0}
                setCurrentPage={setCurrentPage}
                amountTitle='Кількість показаного товару'
            />
        </div>
    );
};

export default ProductsContainer;
