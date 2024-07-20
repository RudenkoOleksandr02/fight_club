import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bannerSlice from "./bannerSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import filterPanelSlice from "./filterPanelSlice";
import homePageSlice from "./homePageSlice";
import searchSlice from "./searchSlice";
import cartSlice from "./cartSlice";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';

// Конфигурация persist для корзины
const cartPersistConfig = {
    key: 'cart',
    storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

const store = configureStore({
    reducer: {
        bannerData: bannerSlice,
        categoryData: categorySlice,
        productData: productSlice,
        filterPanelData: filterPanelSlice,
        homePageData: homePageSlice,
        searchData: searchSlice,
        cart: persistedCartReducer,
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
