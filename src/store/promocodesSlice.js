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
    reducers: {
        clearPromocodes: (state) => {
            state.discount = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPromocodes.fulfilled, (state, action) => {
                state.discount = action.payload;
            })
    }
});

export default promocodesSlice.reducer;
export const {clearPromocodes} = promocodesSlice.actions;

export const getPromocodesCheck = (code) => (dispatch) => {
    return dispatch(loadPromocodes(code));
};
