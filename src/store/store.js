import {configureStore} from '@reduxjs/toolkit';
import bannerSlice from "./bannerSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import filterPanelSlice from "./filterPanelSlice";
import homePageSlice from "./homePageSlice";

export const store = configureStore({
    reducer: {
        bannerData: bannerSlice,
        categoryData: categorySlice,
        productData: productSlice,
        filterPanelData: filterPanelSlice,
        homePageData: homePageSlice,
    }
})