import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bannerSlice from "./bannerSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import filterPanelSlice from "./filterPanelSlice";
import homePageSlice from "./homePageSlice";
import searchSlice from "./searchSlice";
import cartForGuestSlice from "./forGuest/cartForGuestSlice";
import authSlice from "./authSlice";
import checkoutForGuestSlice from "./forGuest/checkoutForGuestSlice";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import cartForUserSlice from "./forUser/cartForUserSlice";
import checkoutForUserSlice from "./forUser/checkoutForUserSlice";
import promocodesSlice from "./promocodesSlice";

const cartForGuestPersistConfig = {
    key: 'cartForGuest',
    storage
};
const authPersistConfig = {
    key: 'auth',
    storage
}

const persistedCartForGuestReducer = persistReducer(cartForGuestPersistConfig, cartForGuestSlice);
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const store = configureStore({
    reducer: {
        bannerData: bannerSlice,
        categoryData: categorySlice,
        productData: productSlice,
        filterPanelData: filterPanelSlice,
        homePageData: homePageSlice,
        searchData: searchSlice,
        cartForGuest: persistedCartForGuestReducer,
        checkoutForGuest: checkoutForGuestSlice,
        cartForUser: cartForUserSlice,
        checkoutForUser: checkoutForUserSlice,
        promocodes: promocodesSlice,
        auth: persistedAuthReducer
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
