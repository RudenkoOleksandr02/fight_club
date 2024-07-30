import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import promocodesAPI from '../api/promocodesApi';

const initialState = {
    discount: 0
};

const loadPromocodes = createAsyncThunk(
    'promocodes/loadPromocodes',
    async (code) => {
        return promocodesAPI.getPromocodesCheck(code);

    }
);

const promocodesSlice = createSlice({
    name: 'promocodes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPromocodes.fulfilled, (state, action) => {
                state.discount = action.payload;
            })
    }
});

export default promocodesSlice.reducer;

export const getPromocodesCheck = (code) => async (dispatch) => {
    return await dispatch(loadPromocodes(code));
};
