import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {shoppingCartOrderApi} from '../../api/shoppingCartOrderApi';
import {adminApi} from "../../api/adminApi";

const initialParams = {
    usedPromocode: "",
    userInfo: {
        name: "",
        phone: "",
        surname: "",
        email: ""
    },
    deliveryInfo: {
        city: "",
        department: ""
    },
    additionalInfo: {
        dontCallMe: false,
        ecoPackaging: false,
    },
    cashbackToUse: 0
}
const initialState = {
    params: initialParams,
    loading: true,
    error: false
};

const checkoutForUserLoading = createAsyncThunk(
    'checkout/checkoutForUserLoading',
    async (params, {rejectWithValue}) => {
        try {
            return await shoppingCartOrderApi.createOrderForUser(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const checkoutForGuestLoading = createAsyncThunk(
    'checkout/checkoutForGuestLoading',
    async ({params, products}, {rejectWithValue}) => {
        try {
            return await shoppingCartOrderApi.createOrderForGuest({
                ...params,
                products
            })
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const createOfflineOrderLoading = createAsyncThunk(
    'checkout/createOfflineOrderLoading',
    async ({
               name,
               phoneNumber,
               surname,
               email,
               usedPromocode,
               cashbackToUse,
               products
           }, {rejectWithValue}) => {
        try {
            return await adminApi.createOfflineOrder({
                name,
                phoneNumber,
                surname,
                email,
                usedPromocode,
                cashbackToUse,
                products
            })
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const checkoutPageSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setUsedPromocode(state, action) {
            state.params.usedPromocode = action.payload;
        },
        setUserInfo(state, action) {
            const {key, value} = action.payload;
            state.params.userInfo[key] = value;
        },
        setDeliveryInfo(state, action) {
            const {key, value} = action.payload;
            state.params.deliveryInfo[key] = value;
        },
        setAdditionalInfo(state, action) {
            const {key, value} = action.payload;
            state.params.additionalInfo[key] = value;
        },
        setCashbackToUse(state, action) {
            state.params.cashbackToUse = action.payload;
        },
        clearParams(state) {
            state.params = initialParams;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutForUserLoading.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(checkoutForUserLoading.fulfilled, (state) => {
                state.loading = false;
                state.params = initialParams;
            })
            .addCase(checkoutForUserLoading.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(checkoutForGuestLoading.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(checkoutForGuestLoading.fulfilled, (state) => {
                state.loading = false;
                state.params = initialParams;
            })
            .addCase(checkoutForGuestLoading.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(createOfflineOrderLoading.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createOfflineOrderLoading.fulfilled, (state) => {
                state.loading = false;
                state.params = initialParams;
            })
            .addCase(createOfflineOrderLoading.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    }
});

export default checkoutPageSlice.reducer;
export const {
    setUsedPromocode,
    setUserInfo,
    setDeliveryInfo,
    setAdditionalInfo,
    setCashbackToUse,
    clearParams
} = checkoutPageSlice.actions;

export const checkout = (params) => async (dispatch, getState) => {
    const state = getState();
    const isAuth = state.auth.isAuth;
    const isAdminAuth = state.admin.adminAuth.data;

    if (isAuth && !isAdminAuth) {
        return await dispatch(checkoutForUserLoading(params));
    } else {
        const products = state.cartPage.productsInCart.map(product => {
            return {
                productId: product.productId,
                productAmount: product.quantity
            }
        });

        if (isAdminAuth) {
            const {
                userInfo: {
                    name,
                    phone: phoneNumber,
                    surname,
                    email
                },
                usedPromocode,
                cashbackToUse
            } = params;

            return await dispatch(createOfflineOrderLoading({
                name,
                phoneNumber,
                surname,
                email,
                usedPromocode,
                cashbackToUse,
                products
            }))
        } else {
            return await dispatch(checkoutForGuestLoading({params, products}));
        }
    }
};
