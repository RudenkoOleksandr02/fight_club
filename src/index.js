import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';
import './assets/styles/variables.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet,
} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store/store';

import ScrollToTop from './common/utils/ScrollToTop';
import Header from "./components/containers/Header/Header";
import Navigation from "./components/containers/Navigation/Navigation";
import Footer from "./components/containers/Footer/Footer";
import Blogs from "./pages/ContentShowcaseList/Blogs/Blogs";
import Brands from "./pages/ContentShowcaseList/Brands/Brands";
import About from "./pages/About/About";
import ErrorPage from "./pages/Error/Error";
import MobilePanel from "./components/containers/MobilePanel/MobilePanel";
import Products from "./pages/Catalog/Products/Products";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import UserPage from "./pages/UserPage/UserPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPanel from "./components/containers/LoginPanel/LoginPanel";
import Contacts from "./pages/Contacts/Contacts";
import ScrollToTopButton from "./components/ui/ScrollToTopButton/ScrollToTopButton";
import Admin from "./admin/Admin";
import Preloader from "./components/ui/Preloader/Preloader";
import Blog from "./pages/ContentShowcaseItem/Blog";
import BannerPage from "./pages/Catalog/BannerPage/BannerPage";
import Brand from "./pages/ContentShowcaseItem/Brand";
import {initializeApp} from "./store/appSlice";
import {getIsAdminAuth} from "./store/adminSlices/adminAuthSlice";
import {getUserShoppingCart} from "./store/pageSlices/cartPageSlice";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Root = () => {
    const initialized = useSelector((state) => state.app.initialized);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();

    const [openLoginPanel, setOpenLoginPanel] = React.useState(false);
    const userButtonRef = React.useRef(null);


    useEffect(() => {
        dispatch(initializeApp());
    }, []);
    useEffect(() => {
        dispatch(getIsAdminAuth());
        dispatch(getUserShoppingCart());
    }, [isAuth])


    if (!initialized) {
        return <Preloader color='secondary' cover={true}/>
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>BLOSSOM</title>
                <meta name="description"
                      content="BLOSSOM - це ваш ідеальний вибір для натуральної та органічної косметики. У нас ви знайдете все для догляду за шкірою, волоссям та тілом: креми, сироватки, шампуні, бальзами, маски та багато іншого. Висока якість, природні інгредієнти та ефективність - основні принципи нашого бренду. Доглядайте за собою з любов'ю разом з BLOSSOM!"
                />
                <meta name="keywords"
                      content="косметика, натуральна косметика, органічна косметика, догляд за шкірою, догляд за волоссям, крем для обличчя, сироватка, шампунь, бальзам, маска для обличчя, BLOSSOM"
                />
            </Helmet>
            <div>
                <div className="login-container">
                    <LoginPanel
                        openLoginPanel={openLoginPanel}
                        setOpenLoginPanel={setOpenLoginPanel}
                        userButtonRef={userButtonRef}
                    />
                </div>
                <div className="app-container">
                    <Header
                        setOpenLoginPanel={setOpenLoginPanel}
                        openLoginPanel={openLoginPanel}
                        userButtonRef={userButtonRef}
                    />
                    <Navigation/>
                    <div className="outlet">
                        <Outlet/>
                    </div>
                    <Footer/>
                    <ScrollToTopButton/>
                    <ScrollToTop/>
                    <MobilePanel setOpenLoginPanel={setOpenLoginPanel} openLoginPanel={openLoginPanel}/>
                </div>
            </div>
        </HelmetProvider>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Root/>}>
                <Route index element={<Home/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/blogs' element={<Blogs/>}/>
                <Route path='/blogs/:id' element={<Blog/>}/>
                <Route path='/banner/:id' element={<BannerPage/>}/>
                <Route path='/brands' element={<Brands/>}/>
                <Route path='/brands/:id' element={<Brand/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/user' element={<UserPage/>}/>
                <Route path='/category/:id' element={<Products/>} errorElement={<ErrorPage/>}/>
                <Route path='/product/:id' element={<Product/>} errorElement={<ErrorPage/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Route>
            <Route path="/admin" element={<Admin/>}/>
        </>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HelmetProvider>
                <RouterProvider router={router}/>
            </HelmetProvider>
        </PersistGate>
    </Provider>
);
