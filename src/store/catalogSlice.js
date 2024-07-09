import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {catalogApi} from "../api";

const initialState = {
    data: []
}
const loadCatalogData = createAsyncThunk(
    'catalog/loadData',
    async () => {
        return catalogApi.getCatalogData();
    }
);

export const catalogSlice = createSlice({
    name: 'catalogData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCatalogData.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    }
})

export const {} = catalogSlice.actions;
export default catalogSlice.reducer;

export const getCatalogData = () => async (dispatch) => {
    return await dispatch(loadCatalogData());
};

