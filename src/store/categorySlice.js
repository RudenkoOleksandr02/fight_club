import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import categoryApi from "../api/categoryApi";

const initialState = {
    categoryTree: [],
    categoryData: []
}
const loadCategoryTree = createAsyncThunk(
    'category/loadCategoryTree',
    async (categoryId) => {
        return categoryApi.getCategoryTree(categoryId);
    }
);
const loadCategoryById = createAsyncThunk(
    'category/loadCategoryById',
    async (categoryId) => {
        return categoryApi.getCategoryById(categoryId);
    }
)

export const categorySlice = createSlice({
    name: 'categoryData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategoryTree.fulfilled, (state, action) => {
                state.categoryTree = action.payload;
            })
            .addCase(loadCategoryById.fulfilled, (state, action) => {
                state.categoryData = action.payload;
            })
    }
})

export const {} = categorySlice.actions;
export default categorySlice.reducer;

export const getCategoryTree = (categoryId) => async (dispatch) => {
    return await dispatch(loadCategoryTree(categoryId));
};

export const getCategoryById = (categoryId) => async (dispatch) => {
    return await dispatch(loadCategoryById(categoryId));
}