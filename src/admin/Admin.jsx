import React, {useEffect, useState} from 'react';
import classes from './Admin.module.css';
import Logo from './images/Blossom.png';
import PrimaryButton from "./buttons/PrimaryButton/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ProductsContainer from "./containers/ProductsContainer/ProductsContainer";
import OrderContainer from "./containers/OrderContainer/OrderContainer";
import Preloader from "../components/ui/Preloader/Preloader";
import {getIsAdminAuth} from "../store/adminSlices/adminAuthSlice";
import BlogsContainer from "./containers/BlogsContainer/BlogsContainer";
import BannerContainer from "./containers/BannerContainer/BannerContainer";
import PromocodeContainer from "./containers/PromocodeContainer/PromocodeContainer";

const Admin = () => {
    const navigate = useNavigate();
    const {adminAuth: {data, loading}} = useSelector(state => state.admin.adminAuth);
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
        isOpenBanner: false,
        isOpenPromocode: false,
        isOpenOrders: false,
        isOpenCharacteristics: false,
        isOpenBlogs: false,
        isOpenUsers: false,
        isOpenParams: false
    });
    const handleOpen = (key) => {
        setNavigation({
            isOpenProducts: false,
            isOpenBanner: false,
            isOpenPromocode: false,
            isOpenOrders: false,
            isOpenCharacteristics: false,
            isOpenBlogs: false,
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

    // BLOGS
    const [currentPageBlogs, setCurrentPageBlogs] = useState(1);
    const [amountBlogs, setAmountBlogs] = useState(10);

    // BANNER
    const [currentPageBanner, setCurrentPageBanner] = useState(1);
    const [amountBanner, setAmountBanner] = useState(10);

    // PROMOCODE
    const [currentPagePromocode, setCurrentPagePromocode] = useState(1);
    const [amountPromocode, setAmountPromocode] = useState(10);

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
                                <PrimaryButton handleClick={() => handleOpen('isOpenOrders')}
                                               isOpen={navigation.isOpenOrders}>Замовлення</PrimaryButton>
                                {/*<PrimaryButton handleClick={() => handleOpen('isOpenCharacteristics')}
                                               isOpen={navigation.isOpenCharacteristics}>Характеристики</PrimaryButton>*/}
                                <PrimaryButton handleClick={() => handleOpen('isOpenBlogs')}
                                               isOpen={navigation.isOpenBlogs}>Блог</PrimaryButton>
                                {/*<PrimaryButton handleClick={() => handleOpen('isOpenUsers')}
                                               isOpen={navigation.isOpenUsers}>Користувачі</PrimaryButton>*/}
                                <PrimaryButton handleClick={() => handleOpen('isOpenBanner')}
                                               isOpen={navigation.isOpenBanner}>Банер</PrimaryButton>
                                <PrimaryButton handleClick={() => handleOpen('isOpenPromocode')}
                                               isOpen={navigation.isOpenPromocode}>Промокод</PrimaryButton>
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
                        {navigation.isOpenOrders && (
                            <OrderContainer
                                currentPage={currentPageOrder}
                                setCurrentPage={setCurrentPageOrder}
                                amount={amountOrder}
                                setAmount={setAmountOrder}
                            />
                        )}
                        {navigation.isOpenBlogs && (
                            <BlogsContainer
                                currentPage={currentPageBlogs}
                                setCurrentPage={setCurrentPageBlogs}
                                amount={amountBlogs}
                                setAmount={setAmountBlogs}
                            />
                        )}
                        {navigation.isOpenBanner && (
                            <BannerContainer
                                currentPage={currentPageBanner}
                                setCurrentPage={setCurrentPageBanner}
                                amount={amountBanner}
                                setAmount={setAmountBanner}
                            />
                        )}
                        {navigation.isOpenPromocode && (
                            <PromocodeContainer
                                currentPage={currentPagePromocode}
                                setCurrentPage={setCurrentPagePromocode}
                                amount={amountPromocode}
                                setAmount={setAmountPromocode}
                            />
                        )}
                    </section>
                </>
            )}
        </main>
    );
};

export default Admin;

