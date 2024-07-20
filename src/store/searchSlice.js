import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import searchApi from "../api/searchApi";

const initialState = {
    searchData: []
}
const loadSearchByQuery = createAsyncThunk(
    'search/loadSearchByQuery',
    async (query) => {
        return searchApi.getSearchByQuery(query);
    }
);

export const searchSlice = createSlice({
    name: 'searchData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSearchByQuery.fulfilled, (state, action) => {
                state.searchData = action.payload;
            })
    }
})

export const {} = searchSlice.actions;
export default searchSlice.reducer;

export const getSearchByQuery = (query) => async (dispatch) => {
    return await dispatch(loadSearchByQuery(query));
};
