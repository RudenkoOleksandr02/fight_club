import {configureStore} from '@reduxjs/toolkit';
import bannerSlice from "./bannerSlice";
import productsSlice from "./productsSlice";
import catalogSlice from "./catalogSlice";
import productSlice from "./productSlice";

export const store = configureStore({
    reducer: {
        bannerData: bannerSlice,
        productsData: productsSlice,
        catalogData: catalogSlice,
        productData: productSlice
    }
})