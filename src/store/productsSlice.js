import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {productsAPI} from '../api/api'

const initialState = {
    data: []
}
const loadProductsData = createAsyncThunk(
    'products/loadData',
    async (filter) => {
        return productsAPI.getProductsData(filter);
    }
);

export const productsSlice = createSlice({
    name: 'productsData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProductsData.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    }
})

export const {} = productsSlice.actions;
export default productsSlice.reducer;

export const getProductsData = (filter) => async (dispatch) => {
    return await dispatch(loadProductsData(filter));
};

