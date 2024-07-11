import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import categoryApi from "../api/categoryApi";

const initialState = {
    categoryTree: []
}
const loadCategoryTree = createAsyncThunk(
    'category/loadCategoryTree',
    async (categoryName) => {
        return categoryApi.getCategoryTree(categoryName);
    }
);

export const categorySlice = createSlice({
    name: 'categoryData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategoryTree.fulfilled, (state, action) => {
                state.categoryTree = action.payload;
            });
    }
})

export const {} = categorySlice.actions;
export default categorySlice.reducer;

export const getCategoryTree = (categoryName) => async (dispatch) => {
    return await dispatch(loadCategoryTree(categoryName));
};

