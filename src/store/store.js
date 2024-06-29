import {configureStore} from '@reduxjs/toolkit';
import bannerSlice from "./bannerSlice";
import productsSlice from "./productsSlice";

export const store = configureStore({
    reducer: {
        bannerData: bannerSlice,
        productsData: productsSlice
    }
})