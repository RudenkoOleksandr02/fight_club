import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bannerPageSlice from "./pageSlices/bannerPageSlice";
import navigationSlice from "./navigationSlice";
import productPageSlice from "./pageSlices/productPageSlice";
import catalogPageSlice from "./pageSlices/catalogPageSlice";
import homePageSlice from "./pageSlices/homePageSlice";
import searchSlice from "./searchSlice";
import authSlice from "./authSlice";
import promocodesSlice from "./promocodesSlice";
import checkoutPageSlice from "./pageSlices/checkoutPageSlice";
import cartPageSlice from './pageSlices/cartPageSlice';
import userPageSlice from "./pageSlices/userPageSlice";
import adminAuthSlice from "./adminSlices/adminAuthSlice";
import adminOrderSlice from "./adminSlices/adminOrderSlice";
import adminBlogSlice from "./adminSlices/adminBlogSlice";
import adminProductSlice from "./adminSlices/adminProductSlice";
import blogPageSlice from "./pageSlices/blogPageSlice";
import adminBannerSlice from "./adminSlices/adminBannerSlice";

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
const cartPersistConfig = {
    key: 'cart',
    storage
};
const persistedCartReducer = persistReducer(cartPersistConfig, cartPageSlice);

const combinedAdminReducer = combineReducers({
    adminProduct: adminProductSlice,
    adminOrder: adminOrderSlice,
    adminAuth: adminAuthSlice,
    adminBlog: adminBlogSlice,
    adminBanner: adminBannerSlice
});

const store = configureStore({
    reducer: {
        navigation: navigationSlice,
        productPage: productPageSlice,
        catalogPage: catalogPageSlice,
        blogPage: blogPageSlice,
        bannerPage: bannerPageSlice,
        homePage: homePageSlice,
        search: searchSlice,
        promocodes: promocodesSlice,
        auth: authSlice,
        admin: combinedAdminReducer,
        cartPage: persistedCartReducer,
        checkoutPage: checkoutPageSlice,
        userPage: userPageSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
export default store;
