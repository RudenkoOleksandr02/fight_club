import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productAPI from '../../api/productApi';
import {handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";

const initialState = {
    product: initialObject,
    alsoBought: initialObject
};

const loadProductById = createAsyncThunk(
    'product/loadProductById',
    async (productId) => {
        return productAPI.getProductById(productId);

    }
);

const loadAlsoBoughtById = createAsyncThunk(
    'product/loadAlsoBoughtById',
    async (productId) => {
        return productAPI.getAlsoBought(productId);
    }
)

const productPageSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProductById.pending, (state) => (
                handlePending(state, 'product'))
            )
            .addCase(loadProductById.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'product'))
            )
            .addCase(loadProductById.rejected, (state, action) => (
                handleRejected(state, action, 'product'))
            )
            .addCase(loadAlsoBoughtById.pending, (state) => (
                handlePending(state, 'alsoBought'))
            )
            .addCase(loadAlsoBoughtById.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'alsoBought'))
            )
            .addCase(loadAlsoBoughtById.rejected, (state, action) => (
                handleRejected(state, action, 'alsoBought'))
            )
    }
});

export default productPageSlice.reducer;

export const getProductById = (productId) => async (dispatch) => {
    return await dispatch(loadProductById(productId));
};
export const getAlsoBoughtById = (productId) => async (dispatch) => {
    return await dispatch(loadAlsoBoughtById(productId))
}