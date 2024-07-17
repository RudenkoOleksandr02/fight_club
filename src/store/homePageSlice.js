import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import homePageApi from "../api/homePageApi";

const initialState = {
    newProducts: [],
    discountsProducts: [],
    popularProducts: [],
    popularProductsByCategory: []
}
const loadNewProducts = createAsyncThunk(
    'homePage/loadNewProducts',
    async () => {
        return homePageApi.getNewProducts();
    }
);
const loadDiscountsProducts = createAsyncThunk(
    'homePage/loadDiscountsProducts',
    async () => {
        return homePageApi.getDiscountsProducts();
    }
);
const loadPopularProducts = createAsyncThunk(
    'homePage/loadPopularProducts',
    async () => {
        return homePageApi.getPopularProducts();
    }
);
const loadPopularProductsByCategory = createAsyncThunk(
    'homePage/loadPopularProductsById',
    async (categoryId) => {
        return homePageApi.getPopularProductsByCategory(categoryId);
    }
)

export const homePageSlice = createSlice({
    name: 'homePageData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadNewProducts.fulfilled, (state, action) => {
                state.newProducts = action.payload;
            })
            .addCase(loadDiscountsProducts.fulfilled, (state, action) => {
                state.discountsProducts = action.payload;
            })
            .addCase(loadPopularProducts.fulfilled, (state, action) => {
                state.popularProducts = action.payload;
            })
            .addCase(loadPopularProductsByCategory.fulfilled, (state, action) => {
                state.popularProductsByCategory = action.payload;
            })

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
export const getPopularProductsByCategory = (categoryId) => async (dispatch) => {
    return await dispatch(loadPopularProductsByCategory(categoryId))
}