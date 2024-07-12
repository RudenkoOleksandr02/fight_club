import {configureStore} from '@reduxjs/toolkit';
import bannerSlice from "./bannerSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import filterPanelSlice from "./filterPanelSlice";

export const store = configureStore({
    reducer: {
        bannerData: bannerSlice,
        categoryData: categorySlice,
        productData: productSlice,
        filterPanelData: filterPanelSlice
    }
})