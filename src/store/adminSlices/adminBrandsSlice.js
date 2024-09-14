import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const getAdminBrandsLoading = createAsyncThunk(
    'admin/getAdminBrandsLoading',
    async (_, {rejectWithValue}) => {
        await delay(500);
        try {
            return await adminApi.getBrands();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getAdminBrandByIdLoading = createAsyncThunk(
    'admin/getAdminBrandByIdLoading',
    async (brandId, {rejectWithValue}) => {
        await delay(500);
        try {
            return await adminApi.getBrandById(brandId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const updateAdminBrandByIdLoading = createAsyncThunk(
    'admin/updateAdminBrandByIdLoading',
    async ({brandId, params}, {rejectWithValue}) => {
        try {
            return await adminApi.updateBrandById(brandId, params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const addAdminBrandLoading = createAsyncThunk(
    'admin/addAdminBrandLoading',
    async (params, {rejectWithValue}) => {
        try {
            return await adminApi.addBrand(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    brands: initialObject,
    brand: initialObject
};

const adminBrandsSlice = createSlice({
    name: 'adminBrands', initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminBrandsLoading.pending, (state) => {
                handlePending(state, 'brands')
            })
            .addCase(getAdminBrandsLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'brands')
            })
            .addCase(getAdminBrandsLoading.rejected, (state, action) => {
                handleRejected(state, action, 'brands')
            })
            .addCase(getAdminBrandByIdLoading.pending, (state) => {
                handlePending(state, 'brand')
            })
            .addCase(getAdminBrandByIdLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'brand')
            })
            .addCase(getAdminBrandByIdLoading.rejected, (state, action) => {
                handleRejected(state, action, 'brand')
            })
    }
});

export const {} = adminBrandsSlice.actions;
export default adminBrandsSlice.reducer;

export const getAdminBrands = () => async (dispatch) => {
    return dispatch(getAdminBrandsLoading())
}
export const getAdminBrandById = (brandId) => async (dispatch) => {
    return dispatch(getAdminBrandByIdLoading(brandId))
}
export const updateAdminBrandById = (brandId, params) => async (dispatch) => {
    return dispatch(updateAdminBrandByIdLoading({brandId, params}))
        .then(() => dispatch(getAdminBrandByIdLoading(brandId)))
}
export const addAdminBrand = (params) => async (dispatch) => {
    return dispatch(addAdminBrandLoading(params))
}