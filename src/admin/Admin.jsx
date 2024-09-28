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
import CharacteristicsContainer from "./containers/CharacteristicsContainer/CharacteristicsContainer";
import BrandsContainer from "./containers/BrandsContainer/BrandsContainer";
import CommentsContainer from "./containers/CommentsContainer/CommentsContainer";
import {getIsAuth} from "../store/authSlice";

const Admin = () => {
    const {isAuthAdmin, loading} = useSelector(state => state.admin.adminAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getIsAuth())
            .then(() => dispatch(getIsAdminAuth()))
    }, [])

    useEffect(() => {
        if (!isAuthAdmin && !loading) {
            navigate('/');
        }
    }, [isAuthAdmin, loading]);

    // ASIDE
    const [navigation, setNavigation] = useState({
        isOpenProducts: true,
        isOpenBanner: false,
        isOpenPromocode: false,
        isOpenOrders: false,
        isOpenCharacteristics: false,
        isOpenBlogs: false,
        isOpenBrands: false,
        isOpenParams: false,
        isOpenComments: false,
    });
    const handleOpen = (key) => {
        setNavigation({
            isOpenProducts: false,
            isOpenBanner: false,
            isOpenPromocode: false,
            isOpenOrders: false,
            isOpenCharacteristics: false,
            isOpenBlogs: false,
            isOpenBrands: false,
            isOpenParams: false,
            isOpenComments: false,
            [key]: true
        });
    }

    // PRODUCTS
    const [currentPageProducts, setCurrentPageProducts] = useState(1);
    const [amountProducts, setAmountProducts] = useState(10);

    // ORDER
    const [currentPageOrder, setCurrentPageOrder] = useState(1);
    const [amountOrder, setAmountOrder] = useState(10);

    // CHARACTERISTICS
    const [currentPageCharacteristics, setCurrentPageCharacteristics] = useState(1);
    const [amountCharacteristics, setAmountCharacteristics] = useState(10);

    // BLOGS
    const [currentPageBlogs, setCurrentPageBlogs] = useState(1);
    const [amountBlogs, setAmountBlogs] = useState(10);

    // BANNER
    const [currentPageBanner, setCurrentPageBanner] = useState(1);
    const [amountBanner, setAmountBanner] = useState(10);

    // PROMOCODE
    const [currentPagePromocode, setCurrentPagePromocode] = useState(1);
    const [amountPromocode, setAmountPromocode] = useState(10);

    // BRANDS
    const [currentPageBrands, setCurrentPageBrands] = useState(1);
    const [amountBrands, setAmountBrands] = useState(10);

    // COMMENTS
    const [currentPageComments, setCurrentPageComments] = useState(1);
    const [amountComments, setAmountComments] = useState(10);

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
                                <PrimaryButton handleClick={() => handleOpen('isOpenCharacteristics')}
                                               isOpen={navigation.isOpenCharacteristics}>Характеристики</PrimaryButton>
                                <PrimaryButton handleClick={() => handleOpen('isOpenBrands')}
                                               isOpen={navigation.isOpenBrands}>Бренди</PrimaryButton>
                                <PrimaryButton handleClick={() => handleOpen('isOpenBlogs')}
                                               isOpen={navigation.isOpenBlogs}>Блог</PrimaryButton>
                                <PrimaryButton handleClick={() => handleOpen('isOpenComments')}
                                                isOpen={navigation.isOpenComments}>Коментарі</PrimaryButton>
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
                        {navigation.isOpenCharacteristics && (
                            <CharacteristicsContainer
                                currentPage={currentPageCharacteristics}
                                setCurrentPage={setCurrentPageCharacteristics}
                                amount={amountCharacteristics}
                                setAmount={setAmountCharacteristics}
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
                        {navigation.isOpenBrands && (
                            <BrandsContainer
                                currentPage={currentPageBrands}
                                setCurrentPage={setCurrentPageBrands}
                                amount={amountBrands}
                                setAmount={setAmountBrands}
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
                        {navigation.isOpenComments && (
                            <CommentsContainer
                                currentPage={currentPageComments}
                                setCurrentPage={setCurrentPageComments}
                                amount={amountComments}
                                setAmount={setAmountComments}
                            />
                        )}
                    </section>
                </>
            )}
        </main>
    );
};

export default Admin;

