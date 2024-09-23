import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CatalogApi from "../../api/catalogApi";
import { handleFulfilled, handlePending, handleRejected, initialObject } from "../../common/utils/forSlice";

const initialState = {
    filterPanel: initialObject,
    catalog: initialObject,
    parentCategory: initialObject,
    childrenCategory: initialObject
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

const getParentCategoryByIdLoading = createAsyncThunk(
    'catalog/getParentCategoryByIdLoading',
    async (categoryId) => {
        return CatalogApi.getCategoryById(categoryId);
    }
);

const getChildrenCategoryByIdLoading = createAsyncThunk(
    'catalog/getChildrenCategoryByIdLoading',
    async (categoryId) => {
        return CatalogApi.getCategoryById(categoryId);
    }
);

export const catalogPageSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        clearParentCategoryData: (state) => {
            state.parentCategory = initialObject;
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
            // Parent Category
            .addCase(getParentCategoryByIdLoading.pending, (state) => (
                handlePending(state, 'parentCategory'))
            )
            .addCase(getParentCategoryByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'parentCategory'))
            )
            .addCase(getParentCategoryByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'parentCategory'))
            )
            // Children Category
            .addCase(getChildrenCategoryByIdLoading.pending, (state) => (
                handlePending(state, 'childrenCategory'))
            )
            .addCase(getChildrenCategoryByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'childrenCategory'))
            )
            .addCase(getChildrenCategoryByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'childrenCategory'))
            );
    }
});

export const { clearParentCategoryData } = catalogPageSlice.actions;
export default catalogPageSlice.reducer;

export const getFilterPanelById = (categoryId) => async (dispatch) => {
    return await dispatch(loadFilterPanel(categoryId));
};

export const getProductsByFilter = (filter) => async (dispatch) => {
    return await dispatch(loadProductsByFilter(filter));
};

export const getParentCategoryById = (categoryId) => async (dispatch) => {
    return await dispatch(getParentCategoryByIdLoading(categoryId));
};

export const getChildrenCategoryById = (categoryId) => async (dispatch) => {
    return await dispatch(getChildrenCategoryByIdLoading(categoryId));
};
