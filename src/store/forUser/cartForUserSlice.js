import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shoppingCartApi } from '../../api/shoppingCartApi';

const getUserShoppingCartLoading = createAsyncThunk(
    'cart/getUserShoppingCartLoading',
    async (_, { rejectWithValue }) => {
        try {
            return await shoppingCartApi.getUserShoppingCart();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const addProductLoading = createAsyncThunk(
    'cart/addProductLoading',
    async (productId, { rejectWithValue }) => {
        try {
            return await shoppingCartApi.addProduct(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const changeProductAmountLoading = createAsyncThunk(
    'cart/changeProductAmountLoading',
    async (params, { rejectWithValue }) => {
        try {
            return await shoppingCartApi.changeProductAmount(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const removeProductLoading = createAsyncThunk(
    'cart/removeProductLoading',
    async (productId, { rejectWithValue }) => {
        try {
            return await shoppingCartApi.removeProduct(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    productsInCart: [],
    loading: false,
    error: null
};

const cartForUserSlice = createSlice({
    name: 'cartForUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserShoppingCartLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserShoppingCartLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.productsInCart = action.payload
            })
            .addCase(getUserShoppingCartLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProductLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.productsInCart = action.payload
            })
            .addCase(addProductLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changeProductAmountLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeProductAmountLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.productsInCart = action.payload
            })
            .addCase(changeProductAmountLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeProductLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProductLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.productsInCart = action.payload
            })
            .addCase(removeProductLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {} = cartForUserSlice.actions;
export default cartForUserSlice.reducer;

export const getUserShoppingCart = () => async (dispatch) => {
    return await dispatch(getUserShoppingCartLoading());
};
export const addProduct = (productId) => async (dispatch) => {
    return await dispatch(addProductLoading(productId));
};
export const changeProductAmount = (params) => async (dispatch) => {
    return await dispatch(changeProductAmountLoading(params));
};
export const removeProduct = (productId) => async (dispatch) => {
    return await dispatch(removeProductLoading(productId));
};