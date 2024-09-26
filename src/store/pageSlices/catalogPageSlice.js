import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CatalogApi from "../../api/catalogApi";
import { handleFulfilled, handlePending, handleRejected, initialObject } from "../../common/utils/forSlice";

const initialState = {
    filterPanel: initialObject,
    catalog: initialObject,
    firstCategory: initialObject,
    secondaryCategory: initialObject,
    tertiaryCategory: initialObject
};

const loadFilterPanel = createAsyncThunk(
    'catalog/loadFilterPanel',
    async (categoryId) => {
        return CatalogApi.getFilterPanelById(categoryId);
    }
);

const loadProductsByFilter = createAsyncThunk(
    'catalog/loadProductsByFilter',
    async (params) => {
        return CatalogApi.getProductsByFilter(params);
    }
);

const getFirstCategoryByIdLoading = createAsyncThunk(
    'catalog/getFirstCategoryByIdLoading',
    async (categoryId) => {
        return CatalogApi.getCategoryById(categoryId);
    }
);

const getSecondaryCategoryByIdLoading = createAsyncThunk(
    'catalog/getSecondaryCategoryByIdLoading',
    async (categoryId) => {
        return CatalogApi.getCategoryById(categoryId);
    }
);

const getTertiaryCategoryByIdLoading = createAsyncThunk(
    'catalog/getTertiaryCategoryByIdLoading',
    async (categoryId) => {
        return CatalogApi.getCategoryById(categoryId);
    }
);


export const catalogPageSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        clearCategoryData: (state) => {
            state.secondaryCategory = initialObject;
            state.firstCategory = initialObject;
        }
    },
    extraReducers: (builder) => {
        builder
            // Filter Panel
            .addCase(loadFilterPanel.pending, (state) => (
                handlePending(state, 'filterPanel'))
            )
            .addCase(loadFilterPanel.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'filterPanel'))
            )
            .addCase(loadFilterPanel.rejected, (state, action) => (
                handleRejected(state, action, 'filterPanel'))
            )
            // Products By Filter
            .addCase(loadProductsByFilter.pending, (state) => (
                handlePending(state, 'catalog'))
            )
            .addCase(loadProductsByFilter.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'catalog'))
            )
            .addCase(loadProductsByFilter.rejected, (state, action) => (
                handleRejected(state, action, 'catalog'))
            )
            // First Category
            .addCase(getFirstCategoryByIdLoading.pending, (state) => (
                handlePending(state, 'firstCategory'))
            )
            .addCase(getFirstCategoryByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'firstCategory'))
            )
            .addCase(getFirstCategoryByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'firstCategory'))
            )
            // Secondary Category
            .addCase(getSecondaryCategoryByIdLoading.pending, (state) => (
                handlePending(state, 'secondaryCategory'))
            )
            .addCase(getSecondaryCategoryByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'secondaryCategory'))
            )
            .addCase(getSecondaryCategoryByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'secondaryCategory'))
            )
            // Tertiary Category
            .addCase(getTertiaryCategoryByIdLoading.pending, (state) => (
                handlePending(state, 'tertiaryCategory'))
            )
            .addCase(getTertiaryCategoryByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'tertiaryCategory'))
            )
            .addCase(getTertiaryCategoryByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'tertiaryCategory'))
            )
    }
});

export const { clearCategoryData } = catalogPageSlice.actions;
export default catalogPageSlice.reducer;

export const getFilterPanelById = (categoryId) => async (dispatch) => {
    return await dispatch(loadFilterPanel(categoryId));
};

export const getProductsByFilter = (filter) => async (dispatch) => {
    return await dispatch(loadProductsByFilter(filter));
};

export const getFirstCategoryById = (categoryId) => async (dispatch) => {
    return await dispatch(getFirstCategoryByIdLoading(categoryId));
};

export const getSecondaryCategoryById = (categoryId) => async (dispatch) => {
    return await dispatch(getSecondaryCategoryByIdLoading(categoryId));
};

export const getTertiaryCategoryById = (categoryId) => async (dispatch) => {
    return await dispatch(getTertiaryCategoryByIdLoading(categoryId));
};

