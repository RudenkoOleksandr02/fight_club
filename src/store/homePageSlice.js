import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import homePageApi from "../api/homePageApi";
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../common/utils/forSlice";

const initialState = {
    newProducts: initialObject,
    discountsProducts: initialObject,
    popularProducts: initialObject
}
const loadNewProducts = createAsyncThunk(
    'homePage/loadNewProducts',
    async () => {
        await delay(500);
        return homePageApi.getNewProducts();
    }
);
const loadDiscountsProducts = createAsyncThunk(
    'homePage/loadDiscountsProducts',
    async () => {
        await delay(500);
        return homePageApi.getDiscountsProducts();
    }
);
const loadPopularProducts = createAsyncThunk(
    'homePage/loadPopularProducts',
    async () => {
        await delay(500);
        return homePageApi.getPopularProducts();
    }
);

export const homePageSlice = createSlice({
    name: 'homePageData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadNewProducts.pending, (state) => (
                handlePending(state, 'newProducts'))
            )
            .addCase(loadNewProducts.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'newProducts'))
            )
            .addCase(loadNewProducts.rejected, (state, action) => (
                handleRejected(state, action, 'newProducts'))
            )
            .addCase(loadDiscountsProducts.pending, (state) => (
                handlePending(state, 'discountsProducts'))
            )
            .addCase(loadDiscountsProducts.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'discountsProducts'))
            )
            .addCase(loadDiscountsProducts.rejected, (state, action) => (
                handleRejected(state, action, 'discountsProducts'))
            )
            .addCase(loadPopularProducts.pending, (state) => (
                handlePending(state, 'popularProducts'))
            )
            .addCase(loadPopularProducts.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'popularProducts'))
            )
            .addCase(loadPopularProducts.rejected, (state, action) => (
                handleRejected(state, action, 'popularProducts'))
            )
    }
})

export const {} = homePageSlice.actions;
export default homePageSlice.reducer;

export const getNewProducts = () => async (dispatch) => {
    return await dispatch(loadNewProducts());
};
export const getDiscountsProducts = () => async (dispatch) => {
    return await dispatch(loadDiscountsProducts());
};
export const getPopularProducts = () => async (dispatch) => {
    return await dispatch(loadPopularProducts());
};
