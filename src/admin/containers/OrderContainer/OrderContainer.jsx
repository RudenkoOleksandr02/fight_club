import React, {useEffect, useState} from 'react';
import TopPanel from "../../TopPanel/TopPanel";
import {useDispatch, useSelector} from "react-redux";
import BottomPanel from "../../BottomPanel/BottomPanel";
import classes from './OrderContainer.module.css'
import SecondaryButton from "../../buttons/SecondaryButton/SecondaryButton";
import OrderTable from "./OrderTable/OrderTable";
import EditOrder from "./EditOrder/EditOrder";
import {getOrderById, getOrdersByAdminFilterPanel} from "../../../store/adminSlices/adminOrderSlice";
import SortButton from "../ProductsContainer/SortButton/SortButton";
import SearchAdmin from "../../SearchAdmin/SearchAdmin";
import LeftPanel from "../../LeftPanel/LeftPanel";
import FilterPanel from "./FilterPanel/FilterPanel";

const OrderContainer = ({currentPage, setCurrentPage, setAmount, amount}) => {
    const { orders } = useSelector(state => state.admin.adminOrder);
    const dispatch = useDispatch();

    // POPUP
    const [isOpenPopupEdit, setIsOpenPopupEdit] = useState(false);
    const [isOpenLeftPanel, setIsOpenLeftPanel] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    // FILTER AND SORT
    const [searchTerm, setSearchTerm] = useState('');
    const handleCloseSearchAdmin = () => {
        setSearchTerm('');
        setIsOpenSearch(false)
    }
    const [statusIds, setStatusIds] = useState([]);
    const [minOrderDate, setMinOrderDate] = useState(null);
    const [maxOrderDate, setMaxOrderDate] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000);
    const [sortOption, setSortOption] = useState('');
    useEffect(() => {
        dispatch(getOrdersByAdminFilterPanel({
            searchTerm,
            statuses: statusIds,
            minOrderDate,
            maxOrderDate,
            minTotalPrice: minPrice,
            maxTotalPrice: maxPrice,
            sortOption,
            start: (currentPage - 1) * amount,
            amount
        }))
    }, [currentPage, amount, sortOption, maxPrice, minPrice, maxOrderDate, minOrderDate, statusIds, searchTerm]);

    const handleClickEdit = (orderId) => {
        dispatch(getOrderById(orderId))
        setIsOpenPopupEdit(true);
    }

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={orders.data.totalCount || 0}
                setCurrentPage={setCurrentPage}
            >
                {/* SORT */}
                <SortButton
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    handleSortOption={() => {}}
                />

                {/* FILTER */}
                <SecondaryButton handleClick={() => setIsOpenLeftPanel(true)}>Фільтрувати</SecondaryButton>
                <LeftPanel isOpen={isOpenLeftPanel} onClose={() => setIsOpenLeftPanel(false)}>
                    <FilterPanel
                        statusIds={statusIds}
                        setStatusIds={setStatusIds}
                        minOrderDate={minOrderDate}
                        setMinOrderDate={setMinOrderDate}
                        maxOrderDate={maxOrderDate}
                        setMaxOrderDate={setMaxOrderDate}
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                    />
                </LeftPanel>

                {/* SEARCH */}
                <SearchAdmin
                    value={searchTerm}
                    handleChange={e => setSearchTerm(e.target.value)}
                    isOpen={isOpenSearch}
                    onClose={handleCloseSearchAdmin}
                    onOpen={() => setIsOpenSearch(true)}
                />
            </TopPanel>
            <OrderTable
                handleClickEdit={handleClickEdit}
            />
            <EditOrder
                isOpenPopupEdit={isOpenPopupEdit}
                setIsOpenPopupEdit={setIsOpenPopupEdit}
                currentPage={currentPage}
                amount={amount}
            />
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={orders.data.totalCount || 0}
                setCurrentPage={setCurrentPage}
                setAmount={setAmount}
                amountTitle='Кількість показаних замовлень'
            />
        </div>
    );
};

export default OrderContainer;
