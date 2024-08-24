import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {adminApi} from '../api/adminApi';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../common/utils/forSlice";

const getIsAdminAuthLoading = createAsyncThunk(
    'admin/getAdminAuthLoading',
    async (_, {rejectWithValue}) => {
        await delay(500);
        try {
            return await adminApi.getAdminAuth();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const getOrdersLoading = createAsyncThunk(
    'admin/getAdminOrdersLoading',
    async (_, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getOrders();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const getProductsByAdminFilterLoading = createAsyncThunk(
    'admin/getProductsByAdminFilterLoading',
    async (params, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getProductsByAdminFilter(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const importFromExcelLoading = createAsyncThunk(
    'admin/importFromExcelLoading',
    async (file, {rejectWithValue}) => {
        try {
            return await adminApi.importFromExcel(file);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const getProductByIdLoading = createAsyncThunk(
    'admin/getProductByIdLoading',
    async (productId, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getProductById(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const putProductByIdLoading = createAsyncThunk(
    'admin/putProductByIdLoading',
    async ({productId, params}, {rejectWithValue}) => {
        try {
            return await adminApi.putProductById(productId, params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const loadPromocodesById = createAsyncThunk(
    'admin/loadPromocodesById',
    async (promoId, {rejectWithValue}) => {
        try {
            await delay(500);
            if (promoId === null) {
                return null;
            }
            return await adminApi.getPromocodesById(promoId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const postImagesByProductIdLoading = createAsyncThunk(
    'admin/postImagesByProductIdLoading',
    async ({productId, files}, {rejectWithValue}) => {
        try {
            return await adminApi.postImagesByProductId(productId, files);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const getCategoryLoading = createAsyncThunk(
    'admin/getCategoryLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await adminApi.getCategory();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const initialState = {
    adminAuth: {...initialObject, data: false},
    orders: initialObject,
    products: initialObject,
    product: initialObject,
    promocode: initialObject,
    category: initialObject
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIsAdminAuthLoading.pending, (state) => (
                handlePending(state, 'adminAuth'))
            )
            .addCase(getIsAdminAuthLoading.fulfilled, (state, action) => {
                state.adminAuth.loading = false;
                state.adminAuth.data = true;
            })
            .addCase(getIsAdminAuthLoading.rejected, (state, action) => (
                handleRejected(state, action, 'adminAuth'))
            )
            .addCase(getOrdersLoading.pending, (state) => (
                handlePending(state, 'orders'))
            )
            .addCase(getOrdersLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'orders'))
            )
            .addCase(getOrdersLoading.rejected, (state, action) => (
                handleRejected(state, action, 'orders'))
            )
            .addCase(getProductsByAdminFilterLoading.pending, (state) => (
                handlePending(state, 'products'))
            )
            .addCase(getProductsByAdminFilterLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'products'))
            )
            .addCase(getProductsByAdminFilterLoading.rejected, (state, action) => (
                handleRejected(state, action, 'products'))
            )
            .addCase(importFromExcelLoading.pending, (state) => (
                handlePending(state, 'products'))
            )
            .addCase(importFromExcelLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'products'))
            )
            .addCase(importFromExcelLoading.rejected, (state, action) => (
                handleRejected(state, action, 'products'))
            )
            .addCase(getProductByIdLoading.pending, (state) => (
                handlePending(state, 'product'))
            )
            .addCase(getProductByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'product'))
            )
            .addCase(getProductByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'product'))
            )
            .addCase(putProductByIdLoading.pending, (state) => (
                handlePending(state, 'product'))
            )
            .addCase(putProductByIdLoading.fulfilled, (state, action) => {
                state.product.loading = false;
            })
            .addCase(putProductByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'product'))
            )
            .addCase(postImagesByProductIdLoading.pending, (state) => (
                handlePending(state, 'product'))
            )
            .addCase(postImagesByProductIdLoading.fulfilled, (state) => {
                state.product.loading = false;
            })
            .addCase(postImagesByProductIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'product'))
            )
            .addCase(loadPromocodesById.pending, (state) => {
                state.promocodes.promocodesData = null;
                handlePending(state, 'promocode');
            })
            .addCase(loadPromocodesById.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'promocode'))
            )
            .addCase(loadPromocodesById.rejected, (state, action) => (
                handleRejected(state, action, 'promocode'))
            )
            .addCase(getCategoryLoading.pending, (state) => {
                handlePending(state, 'category');
            })
            .addCase(getCategoryLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'category'))
            )
            .addCase(getCategoryLoading.rejected, (state, action) => (
                handleRejected(state, action, 'category'))
            )
    }
});

export default adminSlice.reducer;

export const getIsAdminAuth = () => (dispatch) => {
    return dispatch(getIsAdminAuthLoading());
};
export const getOrders = () => (dispatch) => {
    return dispatch(getOrdersLoading());
};
export const getProductsByAdminFilter = (params) => (dispatch) => {
    return dispatch(getProductsByAdminFilterLoading(params));
};
export const importFromExcel = (file) => (dispatch) => {
    return dispatch(importFromExcelLoading(file));
};
export const getProductById = (productId) => (dispatch) => {
    return dispatch(getProductByIdLoading(productId));
};
export const putProductById = (productId, params) => (dispatch) => {
    return dispatch(putProductByIdLoading({productId, params}));
};
export const getPromocodeById = (promoId) => (dispatch) => {
    return dispatch(loadPromocodesById(promoId));
};
export const postImagesByProductId = (productId, files) => (dispatch) => {
    return dispatch(postImagesByProductIdLoading({productId, files}));
};
export const toggleIsShow = (productId, boolean) => async (dispatch) => {
    try {
        const response = await adminApi.toggleIsShow(productId, boolean);
        dispatch({
            type: 'TOGGLE_IS_SHOW_SUCCESS',
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: 'TOGGLE_IS_SHOW_FAILURE',
            payload: error.message,
        });
    }
};
export const toggleIsHit = (productId, boolean) => async (dispatch) => {
    try {
        const response = await adminApi.toggleIsHit(productId, boolean);
        dispatch({
            type: 'TOGGLE_IS_HIT_SUCCESS',
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: 'TOGGLE_IS_HIT_FAILURE',
            payload: error.message,
        });
    }
};
export const getCategory = () => (dispatch) => {
    return dispatch(getCategoryLoading())
}
