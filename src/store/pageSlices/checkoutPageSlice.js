import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shoppingCartOrderApi } from '../../api/shoppingCartOrderApi';
import { cashbackApi } from '../../api/cashbackApi';

export const fetchCashbackBalance = createAsyncThunk(
    'checkout/fetchCashbackBalance',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const isAuth = state.auth.isAuth;
        try {
            if (isAuth) {
                const response = await cashbackApi.getBalance();
                return response.balance;
            } else {
                return 0;
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const checkoutLoading = createAsyncThunk(
    'checkout/checkoutLoading',
    async (params, { getState, rejectWithValue }) => {
        const state = getState();
        const isAuth = state.auth.isAuth;

        try {
            if (isAuth) {
                return await shoppingCartOrderApi.createOrderForUser(params);
            } else {
                return await shoppingCartOrderApi.createOrderForGuest({
                    ...params,
                    products: state.cartPage.productsInCart.map(product => ({
                        productId: product.productId,
                        productAmount: product.quantity
                    }))
                });
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    params: {
        usedPromocode: "",
        cashbackToUse: 0, // Додано
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
            ecoPackaging: false
        }
    },
    loading: false,
    error: null,
    cashbackBalance: 0, // Додано
    cashbackLoading: false, // Додано
    cashbackError: null // Додано
};

const checkoutPageSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setUsedPromocode(state, action) {
            state.params.usedPromocode = action.payload;
        },
        setUserInfo(state, action) {
            const { key, value } = action.payload;
            state.params.userInfo[key] = value;
        },
        setDeliveryInfo(state, action) {
            const { key, value } = action.payload;
            state.params.deliveryInfo[key] = value;
        },
        setAdditionalInfo(state, action) {
            const { key, value } = action.payload;
            state.params.additionalInfo[key] = value;
        },
        setCashbackToUse(state, action) {
            state.params.cashbackToUse = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkoutLoading.fulfilled, (state) => {
                state.loading = false;
                state.params = initialState.params;
            })
            .addCase(checkoutLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCashbackBalance.pending, (state) => {
                state.cashbackLoading = true;
                state.cashbackError = null;
            })
            .addCase(fetchCashbackBalance.fulfilled, (state, action) => {
                state.cashbackLoading = false;
                state.cashbackBalance = action.payload;
            })
            .addCase(fetchCashbackBalance.rejected, (state, action) => {
                state.cashbackLoading = false;
            state.cashbackError = action.payload;
            });
    }
});

export const {
    setUsedPromocode,
    setUserInfo,
    setDeliveryInfo,
    setAdditionalInfo,
    setCashbackToUse
} = checkoutPageSlice.actions;

export default checkoutPageSlice.reducer;

export const checkout = (checkoutData) => async (dispatch) => {
    return await dispatch(checkoutLoading(checkoutData));
};
