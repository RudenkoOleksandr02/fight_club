import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shoppingCartOrderApi } from '../../api/shoppingCartOrderApi';

const checkoutForGuestLoading = createAsyncThunk(
    'checkout/checkoutForGuestLoading',
    async (params, { rejectWithValue }) => {
        try {
            return await shoppingCartOrderApi.createOrderForGuest(params);
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
            ecoPackaging: false
        },
        products: []
    },
    loading: false,
    error: null
};

const checkoutForGuestSlice = createSlice({
    name: 'checkoutForGuest',
    initialState,
    reducers: {
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
        setProducts(state, action) {
            state.params.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutForGuestLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkoutForGuestLoading.fulfilled, (state, action) => {
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
                    },
                    products: []
                };
            })
            .addCase(checkoutForGuestLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    setUserInfo,
    setDeliveryInfo,
    setAdditionalInfo,
    setProducts
} = checkoutForGuestSlice.actions;

export default checkoutForGuestSlice.reducer;

export const checkoutForGuest = () => async (dispatch, getState) => {
    const state = getState();
    return await dispatch(checkoutForGuestLoading(state.checkoutForGuest.params));
};
