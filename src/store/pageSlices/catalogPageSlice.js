import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import CatalogApi from "../../api/catalogApi";
import {handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";

const initialState = {
    filterPanel: initialObject,
    catalog: initialObject
}

const loadFilterPanel = createAsyncThunk(
    'catalog/loadFilterPanel',
    async (categoryId) => {
        return CatalogApi.getFilterPanelById(categoryId);
    }
)
const loadProductsByFilter = createAsyncThunk(
    'catalog/loadProductsByFilter',
    async (params) => {
        return CatalogApi.getProductsByFilter(params);
    }
);


export const catalogPageSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadFilterPanel.pending, (state) => (
                handlePending(state, 'filterPanel'))
            )
            .addCase(loadFilterPanel.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'filterPanel'))
            )
            .addCase(loadFilterPanel.rejected, (state, action) => (
                handleRejected(state, action, 'filterPanel'))
            )
            .addCase(loadProductsByFilter.pending, (state) => (
                handlePending(state, 'catalog'))
            )
            .addCase(loadProductsByFilter.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'catalog'))
            )
            .addCase(loadProductsByFilter.rejected, (state, action) => (
                handleRejected(state, action, 'catalog'))
            )
    }
})

export const {} = catalogPageSlice.actions;
export default catalogPageSlice.reducer

export const getFilterPanelById = (categoryId) => async (dispatch) => {
    return await dispatch(loadFilterPanel(categoryId))
}
export const getProductsByFilter = (filter) => async (dispatch) => {
    return await dispatch(loadProductsByFilter(filter));
};