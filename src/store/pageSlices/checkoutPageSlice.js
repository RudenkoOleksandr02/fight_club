import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {shoppingCartOrderApi} from '../../api/shoppingCartOrderApi';

const checkoutLoading = createAsyncThunk(
    'checkout/checkoutLoading',
    async (params, {getState, rejectWithValue}) => {
        const state = getState();
        const isAuth = state.auth.isAuth;

        try {
            if (isAuth) {
                return await shoppingCartOrderApi.createOrderForUser(params);
            } else {
                return await shoppingCartOrderApi.createOrderForGuest({
                    ...params,
                    products: state.cart.productsInCart.map(product => {
                        return {
                            productId: product.productId,
                            productAmount: product.quantity
                        }
                    })
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
    },
    loading: false,
    error: null
};

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
            .addCase(checkoutLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkoutLoading.fulfilled, (state) => {
                state.loading = false;
                state.params = {
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
                        ecoPackaging: false
                    }
                };
            })
            .addCase(checkoutLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
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

export const checkout = () => async (dispatch, getState) => {
    const state = getState();
    return await dispatch(checkoutLoading(state.checkoutPage.params));
};
