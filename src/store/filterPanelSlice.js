import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import FilterPanelApi from "../api/filterPanelApi";

const initialState = {
    filterPanelData: null
}

const loadFilterPanelData = createAsyncThunk(
    'filterPanel/loadFilterPanelData',
    async (categoryId) => {
        return FilterPanelApi.getFilterPanelById(categoryId);
    }
)

export const filterPanelSlice = createSlice({
    name: 'filterPanel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadFilterPanelData.fulfilled, (state, action) => {
                state.filterPanelData = action.payload;
            })

    }
})

export const {} = filterPanelSlice.actions;
export default filterPanelSlice.reducer

export const getFilterPanelDataById = (categoryId) =>  async (dispatch) => {
    return await dispatch(loadFilterPanelData(categoryId))
}