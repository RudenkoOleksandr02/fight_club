import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {adminApi} from '../api/adminApi';

const getIsAdminAuthLoading = createAsyncThunk(
    'admin/getAdminAuthLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await adminApi.getAdminAuth();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getOrdersLoading = createAsyncThunk(
    'admin/getAdminOrdersLoading',
    async(_, {rejectWithValue}) => {
        try {
            return await adminApi.getOrders();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getProductsByFilterLoading = createAsyncThunk(
    'admin/getProductsByFilterLoading',
    async(params, {rejectWithValue}) => {
        try {
            return await adminApi.getProductsByFilter(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const importFromExcelLoading = createAsyncThunk(
    'admin/importFromExcelLoading',
    async(file, {rejectWithValue}) => {
        try {
            return await adminApi.importFromExcel(file);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    isAdminAuth: false,
    orders: [],
    products: [],
    testExel: [],
    loading: true,
    error: null
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIsAdminAuthLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIsAdminAuthLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.isAdminAuth = true;
            })
            .addCase(getIsAdminAuthLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrdersLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrdersLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrdersLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductsByFilterLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsByFilterLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductsByFilterLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(importFromExcelLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(importFromExcelLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.testExel = action.payload;
            })
            .addCase(importFromExcelLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;

export const getIsAdminAuth = () => async (dispatch) => {
    return await dispatch(getIsAdminAuthLoading())
}
export const getOrders = () => async  (dispatch) => {
    return await dispatch(getOrdersLoading())
}
export const getProductsByFilter = (params) => async  (dispatch) => {
    return await dispatch(getProductsByFilterLoading(params))
}
export const importFromExcel = (file) => async  (dispatch) => {
    return await dispatch(importFromExcelLoading(file))
}