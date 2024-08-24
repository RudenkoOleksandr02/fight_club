import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import navigationApi from "../api/navigationApi";
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../common/utils/forSlice";

const initialState = {
    categoryTree: initialObject,
    popularProductsByCategory: initialObject,
    categories: initialObject
}
const loadCategoryTree = createAsyncThunk(
    'navigation/loadCategoryTree',
    async (categoryId) => {
        await delay(500);
        return navigationApi.getCategoryTree(categoryId);
    }
);
const loadPopularProductsByCategory = createAsyncThunk(
    'navigation/loadPopularProductsById',
    async (categoryId) => {
        await delay(500);
        return navigationApi.getPopularProductsByCategory(categoryId);
    }
);
const loadCategory = createAsyncThunk(
    'navigation/loadCategory',
    async () => {
        await delay(500);
        return navigationApi.getCategory();
    }
)

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategoryTree.pending, (state) => (
                handlePending(state, 'categoryTree'))
            )
            .addCase(loadCategoryTree.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'categoryTree'))
            )
            .addCase(loadCategoryTree.rejected, (state, action) => (
                handleRejected(state, action, 'categoryTree'))
            )
            .addCase(loadPopularProductsByCategory.pending, (state) => (
                handlePending(state, 'popularProductsByCategory'))
            )
            .addCase(loadPopularProductsByCategory.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'popularProductsByCategory'))
            )
            .addCase(loadPopularProductsByCategory.rejected, (state, action) => (
                handleRejected(state, action, 'popularProductsByCategory'))
            )
            .addCase(loadCategory.pending, (state) => (
                handlePending(state, 'categories'))
            )
            .addCase(loadCategory.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'categories'))
            )
            .addCase(loadCategory.rejected, (state, action) => (
                handleRejected(state, action, 'categories'))
            );
    }
});

export const {} = navigationSlice.actions;
export default navigationSlice.reducer;

export const getCategoryTree = (categoryId) => async (dispatch) => {
    return await dispatch(loadCategoryTree(categoryId));
}
export const getPopularProductsByCategory = (categoryId) => async (dispatch) => {
    return await dispatch(loadPopularProductsByCategory(categoryId))
}
export const getCategory = () => async (dispatch) => {
    return await dispatch(loadCategory());
}