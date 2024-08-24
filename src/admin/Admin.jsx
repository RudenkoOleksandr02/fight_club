import React, {useEffect, useState} from 'react';
import classes from './Admin.module.css';
import Logo from './images/Blossom.png';
import PrimaryButton from "./buttons/PrimaryButton/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getIsAdminAuth} from "../store/adminSlice";
import ProductsContainer from "./ProductsContainer/ProductsContainer";
import OrderContainer from "./OrderContainer/OrderContainer";
import Preloader from "../components/ui/Preloader/Preloader";

const Admin = () => {
    const navigate = useNavigate();
    const {data, loading} = useSelector(state => state.admin.adminAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loading && !data) {
            navigate('/');
        }
    }, [data, loading]);

    useEffect(() => {
        dispatch(getIsAdminAuth());
    }, []);

    // ASIDE
    const [navigation, setNavigation] = useState({
        isOpenProducts: true,
        isOpenOrder: false,
        isOpenFilter: false,
        isOpenBlog: false,
        isOpenUsers: false,
        isOpenParams: false
    });
    const handleOpen = (key) => {
        setNavigation({
            isOpenProducts: false,
            isOpenOrder: false,
            isOpenFilter: false,
            isOpenBlog: false,
            isOpenUsers: false,
            isOpenParams: false,
            [key]: true
        });
    }

    // PRODUCTS
    const [currentPageProducts, setCurrentPageProducts] = useState(1);
    const [amountProducts, setAmountProducts] = useState(10);

    // ORDER
    const [currentPageOrder, setCurrentPageOrder] = useState(1);
    const [amountOrder, setAmountOrder] = useState(10);

    return (
        <main className={classes.main}>
            {loading ? <Preloader cover={true} color='secondary'/> : (
                <>
                    <aside className={classes.aside}>
                        <div className={classes.content}>
                            <img src={Logo} alt='Logo'/>
                            <p>Адміністративна панель</p>
                            <nav className={classes.navigation}>
                                <PrimaryButton handleClick={() => handleOpen('isOpenProducts')}
                                               isOpen={navigation.isOpenProducts}>Товари</PrimaryButton>
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
                        </div>
                    </aside>
                    <section className={classes.section}>
                        {navigation.isOpenProducts && (
                            <ProductsContainer
                                currentPage={currentPageProducts}
                                setCurrentPage={setCurrentPageProducts}
                                amount={amountProducts}
                                setAmount={setAmountProducts}
                            />
                        )}
                        {navigation.isOpenOrder && (
                            <OrderContainer
                                currentPage={currentPageOrder}
                                setCurrentPage={setCurrentPageOrder}
                                amount={amountOrder}
                                setAmount={setAmountOrder}
                            />
                        )}
                    </section>
                </>
            )}
        </main>
    );
};

export default Admin;

