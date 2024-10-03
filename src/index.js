import React, { useEffect, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';
import './assets/styles/variables.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet,
} from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';

import ScrollToTop from './common/utils/ScrollToTop';
import Header from './components/containers/Header/Header';
import Navigation from './components/containers/Navigation/Navigation';
import Footer from './components/containers/Footer/Footer';
import ScrollToTopButton from './components/ui/ScrollToTopButton/ScrollToTopButton';
import Preloader from './components/ui/Preloader/Preloader';
import { initializeApp } from './store/appSlice';
import { getIsAdminAuth } from './store/adminSlices/adminAuthSlice';
import { getUserShoppingCart } from './store/pageSlices/cartPageSlice';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Ленивая загрузка компонентов
const Blogs = lazy(() => import('./pages/ContentShowcaseList/Blogs/Blogs'));
const Brands = lazy(() => import('./pages/ContentShowcaseList/Brands/Brands'));
const About = lazy(() => import('./pages/About/About'));
const ErrorPage = lazy(() => import('./pages/Error/Error'));
const MobilePanel = lazy(() => import('./components/containers/MobilePanel/MobilePanel'));
const Products = lazy(() => import('./pages/Catalog/Products/Products'));
const Product = lazy(() => import('./pages/Product/Product'));
const Home = lazy(() => import('./pages/Home/Home'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPanel = lazy(() => import('./components/containers/LoginPanel/LoginPanel'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts'));
const Admin = lazy(() => import('./admin/Admin'));
const Blog = lazy(() => import('./pages/ContentShowcaseItem/Blog'));
const BannerPage = lazy(() => import('./pages/Catalog/BannerPage/BannerPage'));
const Brand = lazy(() => import('./pages/ContentShowcaseItem/Brand'));

const Root = () => {
    const initialized = useSelector((state) => state.app.initialized);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();

    const [openLoginPanel, setOpenLoginPanel] = React.useState(false);
    const userButtonRef = React.useRef(null);

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getIsAdminAuth());
        dispatch(getUserShoppingCart());
    }, [dispatch, isAuth]);

    if (!initialized) {
        return <Preloader color="secondary" cover={true} />;
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>BLOSSOM</title>
                <meta
                    name="description"
                    content="BLOSSOM - це ваш ідеальний вибір для натуральної та органічної косметики. У нас ви знайдете все для догляду за шкірою, волоссям та тілом: креми, сироватки, шампуні, бальзами, маски та багато іншого. Висока якість, природні інгредієнти та ефективність - основні принципи нашого бренду. Доглядайте за собою з любов'ю разом з BLOSSOM!"
                />
                <meta
                    name="keywords"
                    content="косметика, натуральна косметика, органічна косметика, догляд за шкірою, догляд за волоссям, крем для обличчя, сироватка, шампунь, бальзам, маска для обличчя, BLOSSOM"
                />
            </Helmet>
            <div>
                <div className="login-container">
                    <Suspense fallback={<Preloader />}>
                        <LoginPanel
                            openLoginPanel={openLoginPanel}
                            setOpenLoginPanel={setOpenLoginPanel}
                            userButtonRef={userButtonRef}
                        />
                    </Suspense>
                </div>
                <div className="app-container">
                    <Header
                        setOpenLoginPanel={setOpenLoginPanel}
                        openLoginPanel={openLoginPanel}
                        userButtonRef={userButtonRef}
                    />
                    <Navigation />
                    <div className="outlet">
                        <Suspense fallback={<Preloader />}>
                            <Outlet />
                        </Suspense>
                    </div>
                    <Footer />
                    <ScrollToTopButton />
                    <ScrollToTop />
                    <Suspense fallback={<Preloader />}>
                        <MobilePanel
                            setOpenLoginPanel={setOpenLoginPanel}
                            openLoginPanel={openLoginPanel}
                        />
                    </Suspense>
                </div>
            </div>
        </HelmetProvider>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="/contacts"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Contacts />
                        </Suspense>
                    }
                />
                <Route
                    path="/blogs"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Blogs />
                        </Suspense>
                    }
                />
                <Route
                    path="/blogs/:id"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Blog />
                        </Suspense>
                    }
                />
                <Route
                    path="/banner/:id"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <BannerPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/brands"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Brands />
                        </Suspense>
                    }
                />
                <Route
                    path="/brands/:id"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Brand />
                        </Suspense>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <About />
                        </Suspense>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Checkout />
                        </Suspense>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <RegisterPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <UserPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/category/:id"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Products />
                        </Suspense>
                    }
                    errorElement={
                        <Suspense fallback={<Preloader />}>
                            <ErrorPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Product />
                        </Suspense>
                    }
                    errorElement={
                        <Suspense fallback={<Preloader />}>
                            <ErrorPage />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <ErrorPage />
                        </Suspense>
                    }
                />
            </Route>
            <Route
                path="/admin"
                element={
                    <Suspense fallback={<Preloader />}>
                        <Admin />
                    </Suspense>
                }
            />
        </>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </PersistGate>
    </Provider>
);
