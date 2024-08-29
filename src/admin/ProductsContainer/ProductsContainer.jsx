import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    getCategory,
    getProductById,
    getProductsByAdminFilter,
    importFromExcel,
    putProductById
} from "../../store/adminSlice";
import TopPanel from "../TopPanel/TopPanel";
import BottomPanel from "../BottomPanel/BottomPanel";
import SearchAdmin from "../SearchAdmin/SearchAdmin";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import Popup from "../../components/ui/Popup/Popup";
import FileDropzone from "../FileDropzone/FileDropzone";
import ProductsTable from "./ProductsTable";
import PopupAdmin from "../PopupAdmin/PopupAdmin";
import Preloader from "../../components/ui/Preloader/Preloader";
import SelectButton from "../buttons/SelectButton/SelectButton";
import LeftPanel from "../LeftPanel/LeftPanel";
import FilterPanel from "./FilterPanel/FilterPanel";
import PopupForProduct from "./PopupForProduct/PopupForProduct";
import classes from './ProductsContainer.module.css';

const ProductsContainer = ({ currentPage, setCurrentPage, amount, setAmount }) => {
    const dispatch = useDispatch();
    const { products, product, category, adminFilterPanel } = useSelector(state => state.admin);

    // SORT
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [isOpenModalSort, setIsOpenModalSort] = useState(false);

    const handleSortOption = (option) => {
        if (sortOption === `${option}_asc`) {
            setSortOption(`${option}_desc`);
        } else {
            setSortOption(`${option}_asc`);
        }
    };

    const returnInformationForSort = (option, text1, text2) => {
        if (sortOption.endsWith('_desc') && sortOption.startsWith(option)) {
            return <p className={classes.information}>({text2})</p>;
        } else if (sortOption.endsWith('_asc') && sortOption.startsWith(option)) {
            return <p className={classes.information}>({text1})</p>;
        } else {
            return '';
        }
    };

    const returnNameSortButton = () => {
        if (sortOption.startsWith('popularity')) {
            return 'За популярні';
        } else if (sortOption.startsWith('views')) {
            return 'За переглядами';
        } else if (sortOption.startsWith('rating')) {
            return 'За рейтингом';
        } else if (sortOption.startsWith('reviews')) {
            return 'За кількістью відгуків';
        } else if (!sortOption.length) {
            return 'За замовчуванням';
        } else {
            return 'Сортувати за';
        }
    };

    // FILTER
    const [isOpenLeftPanel, setIsOpenLeftPanel] = useState(false);
    const [categoryIds, setCategoryIds] = useState([]);
    const [characteristicIds, setCharacteristicIds] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProductsByAdminFilter({
            amount,
            start: (currentPage - 1) * amount,
            searchTerm,
            sortOption,
            categoryIds,
            selectedCharacteristics: characteristicIds,
            minPrice,
            maxPrice,
        }));
    }, [currentPage, amount, searchTerm, sortOption, categoryIds, characteristicIds, minPrice, maxPrice, dispatch]);

    // IMPORT FILE / ADD PRODUCT
    const [isOpenPopupImportFile, setIsOpenPopupImportFile] = useState(false);
    const [isErrorImport, setIsErrorImport] = useState(false);
    const [isSuccessImport, setIsSuccessImport] = useState(false);

    const handleSendFile = (files) => {
        const file = files[0];
        if (file) {
            dispatch(importFromExcel(file))
                .then(response => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        setIsSuccessImport(true);
                        setIsErrorImport(false);
                    } else {
                        setIsErrorImport(true);
                        setIsSuccessImport(false);
                    }
                });
        } else {
            setIsErrorImport(true);
            setIsSuccessImport(false);
        }
    };

    // ADD
    const [isOpenPopupAddProducts, setIsOpenPopupAddProducts] = useState(false);
    const [isOpenPopupAddProduct, setIsOpenPopupAddProduct] = useState(false);

    const productDataForAdd = {
        id: products.data.totalCount + 1,
        name: '',
        nameEng: '',
        price: '',
        discount: '',
        amount: '',
        article: '',
        description: '',
        characteristics: [],
        images: [],
        mainCategory: null,
        additionalCategories: []
    };

    // EDIT
    const [isOpenPopupProductEdit, setIsOpenPopupProductEdit] = useState(false);

    const handleClickEdit = (productId) => {
        dispatch(getProductById(productId));
        setIsOpenPopupProductEdit(true);
    };

    const [productDataForEditOnlyChange, setProductDataForEditOnlyChange] = useState({});
    const [productDataForEditOnlyTrack, setProductDataForEditOnlyTrack] = useState({});
    const prevProductDataForEditOnlyTrack = useRef();

    useEffect(() => {
        if (product.data) {
            setProductDataForEditOnlyChange({
                id: product.data.id || '',
                images: product.data.images || [],
                name: product.data.name || '',
                nameEng: product.data.nameEng || '',
                price: product.data.price || '',
                discount: product.data.discount || '',
                amount: product.data.amount || '',
                article: product.data.article || '',
                description: product.data.description || '',
                ingridients: product.data.ingridients || '',
                characteristics: product.data.characteristics || [],
                mainCategory: product.data.mainCategory || {},
                additionalCategories: product.data.additionalCategories || []
            });
        }
    }, [product.data]);

    useEffect(() => {
        prevProductDataForEditOnlyTrack.current = productDataForEditOnlyTrack;
        setProductDataForEditOnlyTrack({
            name: productDataForEditOnlyChange.name,
            nameEng: productDataForEditOnlyChange.nameEng,
            price: productDataForEditOnlyChange.price,
            discount: productDataForEditOnlyChange.discount,
            amount: productDataForEditOnlyChange.amount,
            article: productDataForEditOnlyChange.article,
            description: productDataForEditOnlyChange.description,
            ingridients: productDataForEditOnlyChange.ingridients,
            mainCategoryId: productDataForEditOnlyChange.mainCategory?.categoryId,
            characteristicIds: productDataForEditOnlyChange?.characteristics?.map(characteristic => characteristic.characteristicId),
            additionalCategoryIds: productDataForEditOnlyChange?.additionalCategories?.map(addCategory => addCategory.categoryId)
        });
    }, [JSON.stringify(productDataForEditOnlyChange)]);

    const getModifiedFields = (initialData, currentData) => {
        const modifiedFields = {};
        for (const key in initialData) {
            if (initialData[key] !== currentData[key]) {
                modifiedFields[key] = currentData[key];
            }
        }
        return modifiedFields;
    };

    const handlePutProduct = () => {
        const modifiedData = getModifiedFields(prevProductDataForEditOnlyTrack.current, productDataForEditOnlyTrack);
        dispatch(putProductById(product.data.id, modifiedData))
            .then(() => dispatch(getProductById(product.data.id)))
            .then(() => dispatch(getProductsByAdminFilter({ amount, start: (currentPage - 1) * amount })));
    };

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={products.data.totalCount || 0}
                setCurrentPage={setCurrentPage}
            >
                <SearchAdmin
                    value={searchTerm}
                    handleChange={e => setSearchTerm(e.target.value)}
                    isOpen={isOpenSearch}
                    onClose={() => setIsOpenSearch(false)}
                    onOpen={() => setIsOpenSearch(true)}
                />
                <SelectButton
                    title={returnNameSortButton()}
                    content={<>
                        <button onClick={() => setSortOption('')}>
                            Замовчуванням
                        </button>
                        <button onClick={() => handleSortOption('popularity')}>
                            Популярністю
                            {returnInformationForSort('popularity', 'Популярні', 'Не популярні')}
                        </button>
                        <button onClick={() => handleSortOption('views')}>
                            Переглядами
                            {returnInformationForSort('views', 'Більше переглядів', 'Меньше переглядів')}
                        </button>
                        <button onClick={() => handleSortOption('rating')}>
                            Рейтингом
                            {returnInformationForSort('rating', 'Вищий рейтинг', 'Нижчий рейтинг')}
                        </button>
                        <button onClick={() => handleSortOption('reviews')}>
                            Кількістю відгуків
                            {returnInformationForSort('reviews', 'Більше відгуків', 'Меньше відгуків')}
                        </button>
                    </>}
                    setIsOpenModal={setIsOpenModalSort}
                    isOpenModal={isOpenModalSort}
                />
                <SecondaryButton handleClick={() => setIsOpenLeftPanel(prevState => !prevState)}>Фільтрувати</SecondaryButton>
                <SelectButton
                    title='Додати товари'
                    content={<>
                        <button onClick={() => setIsOpenPopupImportFile(true)}>Імпортувати товари</button>
                        <button onClick={() => setIsOpenPopupAddProduct(true)}>Додати товар вручну</button>
                    </>}
                    setIsOpenModal={setIsOpenPopupAddProducts}
                    isOpenModal={isOpenPopupAddProducts}
                />
                {isOpenPopupAddProduct && (
                    <PopupAdmin>
                        <PopupForProduct
                            productData={productDataForAdd}
                            setProductData={setProductDataForEditOnlyChange}
                            handleClosePopup={() => setIsOpenPopupAddProduct(false)}
                            mode='add'
                            handleSaveProduct={handlePutProduct}
                        />
                    </PopupAdmin>
                )}
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
            </TopPanel>
            <ProductsTable
                handleClickEdit={handleClickEdit}
                setSortOption={setSortOption}
                sortOption={sortOption}
                handleSortOption={handleSortOption}
            />
            {isOpenPopupProductEdit && (
                product.loading ? (
                    <Preloader color='secondary' cover={true} />
                ) : (
                    <PopupAdmin>
                        <PopupForProduct
                            productData={productDataForEditOnlyChange}
                            setProductData={setProductDataForEditOnlyChange}
                            handleClosePopup={() => setIsOpenPopupProductEdit(false)}
                            mode='edit'
                            handleSaveProduct={handlePutProduct}
                        />
                    </PopupAdmin>
                )
            )}
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                setAmount={setAmount}
                totalCount={products.data.totalCount || 0}
                setCurrentPage={setCurrentPage}
                amountTitle='Кількість показаного товару'
            />
            <LeftPanel isOpen={isOpenLeftPanel}>
                <FilterPanel
                    categoryIds={categoryIds}
                    setCategoryIds={setCategoryIds}
                    adminFilterPanel={adminFilterPanel}
                    setCharacteristicIds={setCharacteristicIds}
                    characteristicIds={characteristicIds}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                />
            </LeftPanel>
        </div>
    );
};

export default ProductsContainer;
