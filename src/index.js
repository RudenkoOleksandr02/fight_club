import React from 'react';
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
import {Provider} from "react-redux";
import {store} from './store/store';

import ScrollToTop from './common/utils/ScrollToTop'
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

const Root = () => {
    return <div className="app-container">
        <ScrollToTop/>
        <Header/>
        <Navigation/>
        <Outlet/>
        <Footer/>
        <MobilePanel/>
    </div>
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
            <Route index element={<Home/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/brands' element={<Brands/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/category/:id' element={<Catalog/>} errorElement={<ErrorPage/>}/>
            <Route path='product/:id' element={<Product/>} errorElement={<ErrorPage/>}/>/>
            <Route path='*' element={<ErrorPage/>}/>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
