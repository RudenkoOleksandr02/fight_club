import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';
import './assets/styles/variables.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet, useParams, useLocation
} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store/store';

import ScrollToTop from './common/utils/ScrollToTop';
import Header from "./components/containers/Header/Header";
import Navigation from "./components/containers/Navigation/Navigation";
import Footer from "./components/containers/Footer/Footer";
import Blogs from "./pages/Blogs/Blogs";
import Brands from "./pages/Brands/Brands";
import About from "./pages/About/About";
import ErrorPage from "./pages/Error/Error";
import MobilePanel from "./components/containers/MobilePanel/MobilePanel";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import UserPage from "./pages/UserPage/UserPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPanel from "./components/containers/LoginPanel/LoginPanel";
import {getIsAuth} from "./store/authSlice";
import {getUserShoppingCart} from "./store/pageSlices/cartPageSlice";
import Contacts from "./pages/Contacts/Contacts";
import ScrollToTopButton from "./components/ui/ScrollToTopButton/ScrollToTopButton";
import Admin from "./admin/Admin";
import {getCategory} from "./store/navigationSlice";
import Preloader from "./components/ui/Preloader/Preloader";
import Blog from "./pages/Blog/Blog";
import BannerPage from "./pages/BannerPage/BannerPage";
import Brand from "./pages/Brand/Brand";

const Root = () => {
    const [openLoginPanel, setOpenLoginPanel] = React.useState(false);
    const {loading: categoryLoading} = useSelector((state) => state.navigation.categories);
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIsAuth());
    }, []);
    useEffect(() => {
        dispatch(getUserShoppingCart());
    }, [isAuth]);
    useEffect(() => {
        dispatch(getCategory())
    }, [])

    if (categoryLoading) {
        return <Preloader color='secondary' cover={true}/>
    }

    return (
        <div>
            <div className="login-container">
                <LoginPanel
                    openLoginPanel={openLoginPanel}
                    setOpenLoginPanel={setOpenLoginPanel}
                />
            </div>
            <div className="app-container">
                <Header setOpenLoginPanel={setOpenLoginPanel} openLoginPanel={openLoginPanel}/>
                <Navigation/>
                <Outlet/>
                <Footer/>
                <ScrollToTopButton/>
                <ScrollToTop/>
                <MobilePanel setOpenLoginPanel={setOpenLoginPanel} openLoginPanel={openLoginPanel}/>
            </div>
        </div>
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
                <Route path='/category/:id' element={<Catalog/>} errorElement={<ErrorPage/>}/>
                <Route path='/product/:id' element={<Product />} errorElement={<ErrorPage/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Route>
            <Route path="/admin" element={<Admin />}/>
        </>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router}/>
        </PersistGate>
    </Provider>
);
