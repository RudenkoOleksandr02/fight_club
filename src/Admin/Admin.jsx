import React, {useEffect, useState} from 'react';
import classes from './Admin.module.css';
import Logo from './images/Blossom.png';
import PrimaryButton from "./PrimaryButton/PrimaryButton";
import TopPanel from "./TopPanel/TopPanel";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getIsAdminAuth, getOrders, getProductsByFilter, importFromExcel} from "../store/adminSlice";
import Table from "./Table/Table";

const Admin = () => {
    const navigate = useNavigate();
    const {isAdminAuth, orders, products, loading, testExel, error} = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const amount = 15;

    useEffect(() => {
        if (!loading && !isAdminAuth) {
            navigate('/');
        }
    }, [isAdminAuth, loading]);

    useEffect(() => {
        dispatch(getIsAdminAuth());
        dispatch(getOrders());
        dispatch(getProductsByFilter({
            amount: amount,
            start: (currentPage - 1) * amount
        }));
    }, [dispatch, currentPage, amount]);

    const sendFile = (file) => {
        console.log(file)
        dispatch(importFromExcel(file));
    }

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [navigation, setNavigation] = useState({
        isOpenProduct: true,
        isOpenOrder: false,
        isOpenFilter: false,
        isOpenBlog: false,
        isOpenUsers: false,
        isOpenParams: false
    });

    const handleOpen = (key) => {
        setNavigation({
            isOpenProduct: false,
            isOpenOrder: false,
            isOpenFilter: false,
            isOpenBlog: false,
            isOpenUsers: false,
            isOpenParams: false,
            [key]: true
        });
    }

    return (
        <main className={classes.main}>
            <aside className={classes.aside}>
                <img src={Logo} alt='Logo'/>
                <p>Адміністративна панель</p>
                <nav className={classes.navigation}>
                    <PrimaryButton handleClick={() => handleOpen('isOpenProduct')}
                                   isOpen={navigation.isOpenProduct}>Товари</PrimaryButton>
                    <PrimaryButton handleClick={() => handleOpen('isOpenOrder')}
                                   isOpen={navigation.isOpenOrder}>Замовлення</PrimaryButton>
                    <PrimaryButton handleClick={() => handleOpen('isOpenFilter')}
                                   isOpen={navigation.isOpenFilter}>Фільтрування</PrimaryButton>
                    <PrimaryButton handleClick={() => handleOpen('isOpenBlog')}
                                   isOpen={navigation.isOpenBlog}>Блог</PrimaryButton>
                    <PrimaryButton handleClick={() => handleOpen('isOpenUsers')}
                                   isOpen={navigation.isOpenUsers}>Користувачі</PrimaryButton>
                    <PrimaryButton handleClick={() => handleOpen('isOpenParams')}
                                   isOpen={navigation.isOpenParams}>Налаштування</PrimaryButton>
                </nav>
            </aside>
            <section className={classes.section}>
                {loading && <p>Loading...</p>}
                {!loading && error && <p className={classes.error}>Error: {error}</p>}
                {!loading && !error && (
                    <>
                        <TopPanel sendFile={sendFile}/>
                        {navigation.isOpenProduct && (
                            <Table
                                th1='Назва товару'
                                th2='Ціна'
                                th3='Залишок'
                                th4='Дії'
                                data={products.products}
                                keys={{key1: 'name', key2: 'price', key3: 'amount'}}
                            />
                        )}
                        {navigation.isOpenOrder && (
                            <Table
                                th1='Номер замовлення'
                                th2='Ціна'
                                th3='Статус'
                                th4='Дії'
                                data={orders}
                                keys={{key1: 'orderId', key2: 'totalPrice', key3: 'status'}}
                            />
                        )}
                    </>
                )}
            </section>
        </main>
    );
};

export default Admin;
