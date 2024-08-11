import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';
import './assets/styles/variables.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet
} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store/store';

import ScrollToTop from './common/utils/ScrollToTop';
import Header from "./ui/components/Header/Header";
import Navigation from "./containers/Navigation/Navigation";
import Footer from "./ui/components/Footer/Footer";
import Blog from "./pages/Blog/Blog";
import Brands from "./pages/Brands/Brands";
import About from "./pages/About/About";
import ErrorPage from "./pages/Error/Error";
import MobilePanel from "./containers/MobilePanel/MobilePanel";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import UserPage from "./pages/UserPage/UserPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPanel from "./containers/LoginPanel/LoginPanel";
import {getIsAuth} from "./store/authSlice";
import {getUserShoppingCart} from "./store/cartSlice";
import Contacts from "./pages/Contacts/Contacts";
import ScrollToTopButton from "./containers/ScrollToTopButton/ScrollToTopButton";
import Admin from "./Admin/Admin";

const Root = () => {
    const [openLoginPanel, setOpenLoginPanel] = React.useState(false);
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIsAuth());
    }, []);
    useEffect(() => {
        dispatch(getUserShoppingCart());
    }, [isAuth]);

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
                <Route path='/blog' element={<Blog/>}/>
                <Route path='/brands' element={<Brands/>}/>
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
