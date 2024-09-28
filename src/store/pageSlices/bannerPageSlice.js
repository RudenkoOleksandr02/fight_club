import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import bannerApi from "../../api/bannerApi";

const initialState = {
    banners: initialObject,
    banner: initialObject,
    products: initialObject,
    filterPanel: initialObject
}
const getBannersLoading = createAsyncThunk(
    'bannerPage/getBannersLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await bannerApi.getBanners();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getBannerByIdLoading = createAsyncThunk(
    'bannerPage/getBannerByIdLoading',
    async (bannerId, {rejectWithValue}) => {
        try {
            await delay(500);
            return await bannerApi.getBannerById(bannerId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getProductsByBannerFilterLoading = createAsyncThunk(
    'bannerPage/getProductsByBannerFilterLoading',
    async (params, {rejectWithValue}) => {
        try {
            await delay(500);
            return await bannerApi.getProductsByBannerFilter(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getFilterPanelBannerByIdLoading = createAsyncThunk(
    'bannerPage/getFilterPanelBannerByIdLoading',
    async (bannerId, {rejectWithValue}) => {
        try {
            await delay(500);
            return await bannerApi.getFilterPanelBannerById(bannerId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const bannerPageSlice = createSlice({
    name: 'bannerPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBannersLoading.pending, (state) => (
                handlePending(state, 'banners'))
            )
            .addCase(getBannersLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'banners'))
            )
            .addCase(getBannersLoading.rejected, (state, action) => (
                handleRejected(state, action, 'banners'))
            )
            .addCase(getBannerByIdLoading.pending, (state) => (
                handlePending(state, 'banner'))
            )
            .addCase(getBannerByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'banner'))
            )
            .addCase(getBannerByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'banner'))
            )
            .addCase(getProductsByBannerFilterLoading.pending, (state) => (
                handlePending(state, 'products'))
            )
            .addCase(getProductsByBannerFilterLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'products'))
            )
            .addCase(getProductsByBannerFilterLoading.rejected, (state, action) => (
                handleRejected(state, action, 'products'))
            )
            .addCase(getFilterPanelBannerByIdLoading.pending, (state) => (
                handlePending(state, 'filterPanel'))
            )
            .addCase(getFilterPanelBannerByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'filterPanel'))
            )
            .addCase(getFilterPanelBannerByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'filterPanel'))
            )
    }
})

export const {} = bannerPageSlice.actions;
export default bannerPageSlice.reducer;

export const getBanners = () => async (dispatch) => {
    return await dispatch(getBannersLoading());
};
export const getBannerById = (bannerId) => async (dispatch) => {
    return await dispatch(getBannerByIdLoading(bannerId));
};
export const getProductsByBannerFilter = (params) => async (dispatch) => {
    return await dispatch(getProductsByBannerFilterLoading(params))
}
export const getFilterPanelBannerById = (bannerId) => async (dispatch) => {
    return await dispatch(getFilterPanelBannerByIdLoading(bannerId))
}