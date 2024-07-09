import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet
} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from './store/store';

import Header from "./components/common/Header/Header";
import Navigation from "./components/common/Navigation/Navigation";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Brands from "./pages/Brands/Brands";
import About from "./pages/About/About";
import ErrorPage from "./pages/Error/Error";
import MobilePanel from "./components/common/MobilePanel/MobilePanel";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";

/*const loader = ({ params }) => {
    const products = dataProducts.filter(product => {
        return product.categories.some(category => category === params.categoryId);
    });
    if (products.length === 0) {
        throw new Error('Category not found');
    }
    return products;
}*/

const Root = () => {
    return <div className="app-container">
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
            {/*<Route index element={<Home/>}/>*/}
            <Route index element={<Catalog/>}/>
            {/*<Route index element={<Product/>}/>*/}
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/brands' element={<Brands/>}/>
            <Route path='/about' element={<About/>}/>
            {/*<Route path='/categories/:categoryId' element={<Catalog/>} errorElement={<ErrorPage/>}/>*/}
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
