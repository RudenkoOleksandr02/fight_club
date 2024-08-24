import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bannerSlice from "./bannerSlice";
import navigationSlice from "./navigationSlice";
import productPageSlice from "./productPageSlice";
import catalogPageSlice from "./catalogPageSlice";
import homePageSlice from "./homePageSlice";
import searchSlice from "./searchSlice";
import authSlice from "./authSlice";
import promocodesSlice from "./promocodesSlice";
import checkoutPageSlice from "./checkoutPageSlice";
import adminSlice from "./adminSlice";
import cartPageSlice from './cartPageSlice';
import userPageSlice from "./userPageSlice";


import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
const cartPersistConfig = {
    key: 'cart',
    storage
};
const persistedCartReducer = persistReducer(cartPersistConfig, cartPageSlice);

const store = configureStore({
    reducer: {
        banner: bannerSlice,
        navigation: navigationSlice,
        productPage: productPageSlice,
        catalogPage: catalogPageSlice,
        homePage: homePageSlice,
        search: searchSlice,
        promocodes: promocodesSlice,
        auth: authSlice,
        admin: adminSlice,
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
