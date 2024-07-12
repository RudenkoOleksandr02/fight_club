import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productAPI from '../api/productApi';

const initialState = {
    product: null,
    catalog: null
};

const loadProductById = createAsyncThunk(
    'product/loadProductById',
    async (id) => {
        return productAPI.getProductById(id);

    }
);

const loadProductsByFilter = createAsyncThunk(
    'product/loadProductsByFilter',
    async (params) => {
        return productAPI.getProductsByFilter(params);
    }
);

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

    }
});

export default productSlice.reducer;

export const getProductById = (id) => async (dispatch) => {
    return await dispatch(loadProductById(id));
};

export const getProductsByFilter = (filter) => async (dispatch) => {
    return await dispatch(loadProductsByFilter(filter));
};
