import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productAPI from '../api/productApi';

const initialState = {
    product: null,
    catalog: null,
    alsoBought: null
};

const loadProductById = createAsyncThunk(
    'product/loadProductById',
    async (productId) => {
        return productAPI.getProductById(productId);

    }
);
const loadProductsByFilter = createAsyncThunk(
    'product/loadProductsByFilter',
    async (params) => {
        return productAPI.getProductsByFilter(params);
    }
);
const loadAlsoBoughtById = createAsyncThunk(
    'product/loadAlsoBoughtById',
    async (productId) => {
        return productAPI.getAlsoBought(productId);
    }
)

const productSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProductById.fulfilled, (state, action) => {
                state.product = action.payload;
            })
            .addCase(loadProductsByFilter.fulfilled, (state, action) => {
                state.catalog = action.payload;
            })
            .addCase(loadAlsoBoughtById.fulfilled, (state, action) => {
                state.alsoBought = action.payload
            })

    }
});

export default productSlice.reducer;

export const getProductById = (productId) => async (dispatch) => {
    return await dispatch(loadProductById(productId));
};
export const getProductsByFilter = (filter) => async (dispatch) => {
    return await dispatch(loadProductsByFilter(filter));
};
export const getAlsoBoughtById = (productId) => async (dispatch) => {
    return await dispatch(loadAlsoBoughtById(productId))
}