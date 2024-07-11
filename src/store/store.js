import {configureStore} from '@reduxjs/toolkit';
import bannerSlice from "./bannerSlice";
import productsSlice from "./productsSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";

export const store = configureStore({
    reducer: {
        bannerData: bannerSlice,
        productsData: productsSlice,
        categoryData: categorySlice,
        productData: productSlice
    }
})