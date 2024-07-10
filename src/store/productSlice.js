import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {productsAPI} from '../api'

const initialState = {
    data: []
}
const loadProductData = createAsyncThunk(
    'product/loadData',
    async (id) => {
        return productsAPI.getProductById(id);
    }
);

export const productSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProductData.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    }
})

export const {} = productSlice.actions;
export default productSlice.reducer;

export const getProductById = (id) => async (dispatch) => {
    const data = await dispatch(loadProductData(id));
    debugger
    return data
};

