import React, {useEffect, useState} from 'react';
import TopPanel from "../TopPanel/TopPanel";
import {getCategory, getProductById, getProductsByAdminFilter, importFromExcel} from "../../store/adminSlice";
import {useDispatch, useSelector} from "react-redux";
import classes from './ProductsContainer.module.css'
import BottomPanel from "../BottomPanel/BottomPanel";
import SearchAdmin from "../SearchAdmin/SearchAdmin";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import Popup from "../../components/ui/Popup/Popup";
import FileDropzone from "../FileDropzone/FileDropzone";
import ProductsTable from "./ProductsTable";
import ProductEditContainer from "./ProductEditContainer";
import PopupAdmin from "../PopupAdmin/PopupAdmin";
import Preloader from "../../components/ui/Preloader/Preloader";
import SelectButton from "../buttons/SelectButton/SelectButton";
import LeftPanel from "../LeftPanel/LeftPanel";
import ContentForLeftPanel from "./ContentForLeftPanel/ContentForLeftPanel";
import PopupForProduct from "./PopupForProduct/PopupForProduct";

const ProductsContainer = ({currentPage, setCurrentPage, amount, setAmount}) => {
    const dispatch = useDispatch();
    const {products, product, category} = useSelector(state => state.admin);

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
    }
    const returnInformationForSort = (option, text1, text2) => {
        if (sortOption.endsWith('_desc') && sortOption.startsWith(option)) {
            return <p className={classes.information}>
                ({text2})
            </p>
        } else if (sortOption.endsWith('_asc') && sortOption.startsWith(option)) {
            return <p className={classes.information}>
                ({text1})
            </p>
        } else {
            return ''
        }
    }
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
            return 'Сортувати за'
        }
    };

    // FILTER
    const [isOpenLeftPanel, setIsOpenLeftPanel] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    useEffect(() => {
        dispatch(getCategory())
    }, [])
    const [characteristics, setCharacteristics] = useState([])

    useEffect(() => {
        dispatch(getProductsByAdminFilter({
            amount: amount,
            start: (currentPage - 1) * amount,
            searchTerm: searchTerm,
            sortOption: sortOption,
            categoryId: categoryId,
            selectedCharacteristics: characteristics
        }));
    }, [currentPage, amount, searchTerm, sortOption, categoryId, characteristics]);

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
        name: null,
        nameEng: null,
        price: null,
        discount: null,
        amount: null,
        article: null,
        description: null,
        characteristics: null,
        images: null,
        mainCategory: null,
        additionalCategories: null,
    }

    // EDIT
    const [isOpenPopupProductEdit, setIsOpenPopupProductEdit] = useState(false);
    const handleClickEdit = (productId) => {
        dispatch(getProductById(productId));
        setIsOpenPopupProductEdit(true);
    }

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
                    onOpen={() => setIsOpenSearch(true)}/>
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
                            handleClosePopup={() => setIsOpenPopupAddProduct(false)}
                            mode='add'
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
                    <Preloader color='secondary' cover={true}/>
                ) : (
                    <PopupAdmin>
                        <ProductEditContainer
                            handleClose={() => setIsOpenPopupProductEdit(false)}
                            forDispatchProducts={{amount, start: (currentPage - 1) * amount}}
                            productData={product.data}
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
                <ContentForLeftPanel
                    category={category}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                />
            </LeftPanel>
        </div>
    );
};

export default ProductsContainer;