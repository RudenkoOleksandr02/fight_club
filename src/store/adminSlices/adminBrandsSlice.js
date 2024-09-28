import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const getAdminBrandsLoading = createAsyncThunk(
    'admin/getAdminBrandsLoading',
    async (_, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getBrands();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getAdminBrandByIdLoading = createAsyncThunk(
    'admin/getAdminBrandByIdLoading',
    async (brandId, {rejectWithValue}) => {
        try {
            await delay(500);
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
const getAdminBrandsBySearchLoading = createAsyncThunk(
    'admin/getAdminBrandsBySearchLoading',
    async (searchTerm, {rejectWithValue}) => {
        try {
            return await adminApi.getBrandsBySearch(searchTerm);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const deleteBrandByIdLoading = createAsyncThunk(
    'admin/deleteBrandByIdLoading',
    async (brandId, {rejectWithValue}) => {
        try {
            return await adminApi.deleteBrandById(brandId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    brands: initialObject,
    brand: initialObject,
    brandsSearch: initialObject,
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
            .addCase(getAdminBrandsBySearchLoading.pending, (state) => {
                handlePending(state, 'brandsSearch')
            })
            .addCase(getAdminBrandsBySearchLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'brandsSearch')
            })
            .addCase(getAdminBrandsBySearchLoading.rejected, (state, action) => {
                handleRejected(state, action, 'brandsSearch')
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
export const getAdminBrandsBySearch = (searchTerm) => async (dispatch) => {
    return dispatch(getAdminBrandsBySearchLoading(searchTerm))
}
export const deleteBrandById = (brandId) => async (dispatch) => {
    return dispatch(deleteBrandByIdLoading(brandId))
}
