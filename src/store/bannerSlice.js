import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import bannerDataJSON from './../data/banner.json'

const initialState = {
    data: []
}
const loadBannerData = () => {
    return bannerDataJSON;
};

export const bannerSlice = createSlice({
    name: 'bannerData',
    initialState,
    reducers: {
        loadBannerDataFromFile: (state) => {
            state.data = loadBannerData();
        }
    },
})

export const {loadBannerDataFromFile} = bannerSlice.actions;
export default bannerSlice.reducer;

