import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import bannerDataJSON from './../data/banner.json'

const initialState = {
    data: []
}
/*const loadBannerData = createAsyncThunk(
    'banner/loadData',
    async (getBannerData) => {
        return await getBannerData();
    }
);*/
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
    /*extraReducers: (builder) => {
        builder
            .addCase(loadBannerData.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    }*/
})

export const {loadBannerDataFromFile} = bannerSlice.actions;
export default bannerSlice.reducer;

/*export const getBannerData = () => async (dispatch) => {
    await dispatch(loadBannerData(bannerDataJSON()));
};*/
