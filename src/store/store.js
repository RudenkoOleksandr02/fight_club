import {configureStore} from '@reduxjs/toolkit';
import bannerSlice from "./bannerSlice";
import productsSlice from "./productsSlice";
import catalogSlice from "./catalogSlice";

export const store = configureStore({
    reducer: {
        bannerData: bannerSlice,
        productsData: productsSlice,
        catalogData: catalogSlice
    }
})