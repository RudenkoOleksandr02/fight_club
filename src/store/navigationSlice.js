import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import navigationApi from "../api/navigationApi";
import {handleFulfilled, handlePending, handleRejected, initialObject} from "../common/utils/forSlice";

const initialState = {
    categoryTree: initialObject,
    popularProductsByCategory: initialObject,
    categories: initialObject
}
const loadCategoryTree = createAsyncThunk(
    'navigation/loadCategoryTree',
    async (categoryId, {dispatch, rejectWithValue}) => {
        try {
            await dispatch(removeCategoryTree())
            return await navigationApi.getCategoryTree(categoryId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const loadPopularProductsByCategory = createAsyncThunk(
    'navigation/loadPopularProductsById',
    async (categoryId, {dispatch, rejectWithValue}) => {
        try {
            await dispatch(removePopularProducts());
            return await navigationApi.getPopularProductsByCategory(categoryId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const loadCategory = createAsyncThunk(
    'navigation/loadCategory',
    async (_, {rejectWithValue}) => {
        try {
            return await navigationApi.getCategory();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        removePopularProducts(state) {
            state.popularProductsByCategory = {
                data: [],
                loading: true,
                error: null
            };
        },
        removeCategoryTree(state) {
            state.categoryTree = {
                data: [],
                loading: true,
                error: null
            };
        }
    },
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
            )
    }
});

export const {removePopularProducts, removeCategoryTree} = navigationSlice.actions;
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