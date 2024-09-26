import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {shoppingCartOrderApi} from '../../api/shoppingCartOrderApi';

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
            });
    }
});

export default checkoutPageSlice.reducer;
export const {
    setUsedPromocode,
    setUserInfo,
    setDeliveryInfo,
    setAdditionalInfo,
    setCashbackToUse
} = checkoutPageSlice.actions;

export const checkout = (params) => async (dispatch, getState) => {
    const state = getState();
    const isAuth = state.auth.isAuth;

    if (isAuth) {
        return await dispatch(checkoutForUserLoading(params));
    } else {
        const products = state.cartPage.productsInCart.map(product => {
            return {
                productId: product.productId,
                productAmount: product.quantity
            }
        });
        return await dispatch(checkoutForGuestLoading({params, products}));
    }
};
