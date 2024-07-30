import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shoppingCartOrderApi } from '../../api/shoppingCartOrderApi';

const checkoutForUserLoading = createAsyncThunk(
    'checkout/checkoutForUserLoading',
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
        }
    },
    loading: false,
    error: null
};

const checkoutForUserSlice = createSlice({
    name: 'checkoutForUser',
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutForUserLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkoutForUserLoading.fulfilled, (state, action) => {
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
            .addCase(checkoutForUserLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    setUserInfo,
    setDeliveryInfo,
    setAdditionalInfo
} = checkoutForUserSlice.actions;

export default checkoutForUserSlice.reducer;

export const checkoutForUser = () => async (dispatch, getState) => {
    const state = getState();
    return await dispatch(checkoutForUserLoading(state.checkoutForUser.params));
};
