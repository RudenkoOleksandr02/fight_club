import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useProductCatalog = ({
                               fetchFilterPanelData,
                               fetchProductsData,
                               initialParams,
                               identifier,
                               identifierKey,
                           }) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [categoryIds, setCategoryIds] = useState([]);
    const [characteristicIds, setCharacteristicIds] = useState([]);
    const [brandIds, setBrandIds] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [isVisibleFilterPanelInMobile, setIsVisibleFilterPanelInMobile] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const amount = 15;

    useEffect(() => {
        setIsPageLoading(true);

        setCurrentPage(1);
        setSortBy("");
        setCategoryIds([]);
        setCharacteristicIds([]);
        setBrandIds([]);
        setMinPrice(0);
        setMaxPrice(0);

        dispatch(fetchFilterPanelData(identifier));
    }, [identifier, dispatch, fetchFilterPanelData]);

    useEffect(() => {
        if (initialParams.filterPanelData) {
            setMinPrice(initialParams.filterPanelData.minPrice || 0);
            setMaxPrice(initialParams.filterPanelData.maxPrice || 0);

            fetchProducts(
                1,
                [],
                [],
                [],
                initialParams.filterPanelData.minPrice || 0,
                initialParams.filterPanelData.maxPrice || 0,
                ""
            ).finally(() => setIsPageLoading(false));
        }
    }, [initialParams.filterPanelData]);

    const fetchProducts = useCallback(
        (
            actualCurrentPage = currentPage,
            actualCharacteristicIds = characteristicIds,
            actualBrandIds = brandIds,
            actualCategoryIds = categoryIds,
            actualMinPrice = minPrice,
            actualMaxPrice = maxPrice,
            actualSortBy = sortBy
        ) => {
            const params = {
                sortBy: actualSortBy,
                amount,
                start: (actualCurrentPage - 1) * amount,
                minPrice: actualMinPrice,
                maxPrice: actualMaxPrice,
                selectedCharacteristics: actualCharacteristicIds,
                brandIds: actualBrandIds,
                categoryIds: actualCategoryIds,
            };

            params[identifierKey] = identifier;

            return dispatch(fetchProductsData(params));
        },
        [
            dispatch,
            identifier,
            identifierKey,
            amount,
            currentPage,
            sortBy,
            minPrice,
            maxPrice,
            characteristicIds,
            brandIds,
            categoryIds,
            fetchProductsData,
        ]
    );

    // Применение фильтров
    const handleApplyFilter = () => {
        setIsPageLoading(true);
        setCurrentPage(1);
        fetchProducts(1).finally(() => setIsPageLoading(false));
    };

    useEffect(() => {
        setIsPageLoading(true);
        fetchProducts().finally(() => setIsPageLoading(false));
    }, [currentPage, sortBy]);

    return {
        currentPage,
        setCurrentPage,
        sortBy,
        setSortBy,
        categoryIds,
        setCategoryIds,
        characteristicIds,
        setCharacteristicIds,
        brandIds,
        setBrandIds,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        isVisibleFilterPanelInMobile,
        setIsVisibleFilterPanelInMobile,
        isPageLoading,
        handleApplyFilter,
        amount,
        fetchProducts,
    };
};

export default useProductCatalog;
