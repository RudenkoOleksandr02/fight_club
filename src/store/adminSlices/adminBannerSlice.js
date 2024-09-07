import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const getAdminBannersLoading = createAsyncThunk(
    'admin/getAdminBannersLoading',
    async (_, {rejectWithValue}) => {
        await delay(500);
        try {
            return await adminApi.getBanners();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getAdminBannerByIdLoading = createAsyncThunk(
    'admin/getAdminBannerByIdLoading',
    async (bannerId, {rejectWithValue}) => {
        await delay(500);
        try {
            return await adminApi.getBannerById(bannerId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const updateAdminBannerByIdLoading = createAsyncThunk(
    'admin/updateAdminBannerByIdLoading',
    async ({bannerId, params}, {rejectWithValue}) => {
        try {
            return await adminApi.updateBannerById(bannerId, params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getProductsBySearchForBannerLoading = createAsyncThunk(
    'admin/getProductsBySearchForBannerLoading',
    async (searchTerm, {rejectWithValue}) => {
        try {
            return await adminApi.getProductsBySearch(searchTerm);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const addBannerLoading = createAsyncThunk(
    'admin/addBannerLoading',
    async (params) => {
        return adminApi.addBanner(params);
    }
)

const initialState = {
    banners: initialObject,
    banner: initialObject,
    productsSearch: initialObject
};

const adminBannerSlice = createSlice({
    name: 'adminBanner', initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminBannersLoading.pending, (state) => {
                handlePending(state, 'banners')
            })
            .addCase(getAdminBannersLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'banners')
            })
            .addCase(getAdminBannersLoading.rejected, (state, action) => {
                handleRejected(state, action, 'banners')
            })
            .addCase(getAdminBannerByIdLoading.pending, (state) => {
                handlePending(state, 'banner')
            })
            .addCase(getAdminBannerByIdLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'banner')
            })
            .addCase(getAdminBannerByIdLoading.rejected, (state, action) => {
                handleRejected(state, action, 'banner')
            })
            .addCase(updateAdminBannerByIdLoading.pending, (state) => {
                handlePending(state, 'banner')
            })
            .addCase(updateAdminBannerByIdLoading.fulfilled, (state, action) => {
                state.banner.loading = false
            })
            .addCase(updateAdminBannerByIdLoading.rejected, (state, action) => {
                handleRejected(state, action, 'banner')
            })
            .addCase(getProductsBySearchForBannerLoading.pending, (state) => {
                handlePending(state, 'productsSearch')
            })
            .addCase(getProductsBySearchForBannerLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'productsSearch')
            })
            .addCase(getProductsBySearchForBannerLoading.rejected, (state, action) => {
                handleRejected(state, action, 'productsSearch')
            })
            .addCase(addBannerLoading.pending, (state) => (
                handlePending(state, 'banners'))
            )
            .addCase(addBannerLoading.fulfilled, (state, action) => {
                state.banners.loading = false;
            })
            .addCase(addBannerLoading.rejected, (state, action) => (
                handleRejected(state, action, 'banners'))
            )
    }
});

export const {} = adminBannerSlice.actions;
export default adminBannerSlice.reducer;

export const getAdminBanners = () => async (dispatch) => {
    return dispatch(getAdminBannersLoading())
}
export const getAdminBannerById = (bannerId) => async (dispatch) => {
    return dispatch(getAdminBannerByIdLoading(bannerId))
}
export const updateAdminBannerById = (bannerId, params) => async (dispatch) => {
    return dispatch(updateAdminBannerByIdLoading({bannerId, params}))
        .then(() => dispatch(getAdminBannerByIdLoading(bannerId)))
}
export const getProductsBySearchForBanner = (searchTerm) => async (dispatch) => {
    return dispatch(getProductsBySearchForBannerLoading(searchTerm))
}
export const addBanner = (params) => async (dispatch) => {
    return await dispatch(addBannerLoading(params));
};