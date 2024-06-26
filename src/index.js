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


const Root = () => {
    return <div className="app-container">
        <Header/>
        <Navigation/>
        <Outlet/>
        <Footer/>
    </div>
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
            <Route index element={<Home/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='brands' element={<Brands/>}/>
            <Route path='/about' element={<About/>}/>
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
