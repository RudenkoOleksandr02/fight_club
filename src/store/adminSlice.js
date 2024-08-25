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
const getCharacteristicSearchLoading = createAsyncThunk(
    'admin/getCharacteristicSearchLoading',
    async (values, {rejectWithValue}) => {
        try {
            return await adminApi.getCharacteristicSearch(values);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getCharacteristicValuesLoading = createAsyncThunk(
    'admin/getCharacteristicValuesLoading',
    async (values, {rejectWithValue}) => {
        try {
            return await adminApi.getCharacteristicValues(values);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getCharacteristicByIdLoading = createAsyncThunk(
    'admin/getCharacteristicByIdLoading',
    async (characteristicId, {rejectWithValue}) => {
        try {
            return await adminApi.getCharacteristicById(characteristicId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const searchCategoriesLoading = createAsyncThunk(
    'admin/searchCategoriesLoading',
    async (searchTerm, {rejectWithValue}) => {
        try {
            return await adminApi.searchCategories(searchTerm);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getAdminFilterPanelLoading = createAsyncThunk(
    'admin/getAdminFilterPanelLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await adminApi.getAdminFilterPanel();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getOrderByIdLoading = createAsyncThunk(
    'admin/getOrderByIdLoading',
    async (orderId, {rejectWithValue}) => {
        try {
            return await adminApi.getOrderById(orderId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const updateOrderByIdLoading = createAsyncThunk(
    'admin/updateOrderByIdLoading',
    async ({orderId, status}, {rejectWithValue}) => {
        try {
            return await adminApi.updateOrderById(orderId, status);
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
    category: initialObject,
    characteristicsValues: initialObject,
    characteristicsOptions: initialObject,
    characteristicById: initialObject,
    categoriesSearch: initialObject,
    adminFilterPanel: initialObject,
    orderById: initialObject
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderByIdLoading.pending, (state) => (
                handlePending(state, 'orderById'))
            )
            .addCase(getOrderByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'orderById'))
            )
            .addCase(getOrderByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'orderById'))
            )
            .addCase(updateOrderByIdLoading.pending, (state) => (
                handlePending(state, 'orderById'))
            )
            .addCase(updateOrderByIdLoading.fulfilled, (state, action) => {
                state.orderById.loading = false;
            })
            .addCase(updateOrderByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'orderById'))
            )
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
            .addCase(getCharacteristicSearchLoading.pending, (state) => {
                handlePending(state, 'characteristicsValues');
            })
            .addCase(getCharacteristicSearchLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'characteristicsValues'))
            )
            .addCase(getCharacteristicSearchLoading.rejected, (state, action) => (
                handleRejected(state, action, 'characteristicsValues'))
            )
            .addCase(getCharacteristicValuesLoading.pending, (state) => {
                handlePending(state, 'characteristicsOptions');
            })
            .addCase(getCharacteristicValuesLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'characteristicsOptions'))
            )
            .addCase(getCharacteristicValuesLoading.rejected, (state, action) => (
                handleRejected(state, action, 'characteristicsOptions'))
            )
            .addCase(getCharacteristicByIdLoading.pending, (state) => {
                handlePending(state, 'characteristicById');
            })
            .addCase(getCharacteristicByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'characteristicById'))
            )
            .addCase(getCharacteristicByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'characteristicById'))
            )
            .addCase(searchCategoriesLoading.pending, (state) => {
                handlePending(state, 'categoriesSearch');
            })
            .addCase(searchCategoriesLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'categoriesSearch'))
            )
            .addCase(searchCategoriesLoading.rejected, (state, action) => (
                handleRejected(state, action, 'categoriesSearch'))
            )
            .addCase(getAdminFilterPanelLoading.pending, (state) => {
                handlePending(state, 'adminFilterPanel');
            })
            .addCase(getAdminFilterPanelLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'adminFilterPanel'))
            )
            .addCase(getAdminFilterPanelLoading.rejected, (state, action) => (
                handleRejected(state, action, 'adminFilterPanel'))
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
export const getCharacteristicSearch = (values) => (dispatch) => {
    return dispatch(getCharacteristicSearchLoading(values))
}
export const getCharacteristicValues = (values) => (dispatch) => {
    return dispatch(getCharacteristicValuesLoading(values))
}
export const getCharacteristicById = (characteristicId) => (dispatch) => {
    return dispatch(getCharacteristicByIdLoading(characteristicId))
}
export const searchCategories = (searchTerm) => (dispatch) => {
    return dispatch(searchCategoriesLoading(searchTerm))
}
export const getAdminFilterPanel = () => (dispatch) => {
    return dispatch(getAdminFilterPanelLoading())
}
export const getOrderById = (orderId) => (dispatch) => {
    return dispatch(getOrderByIdLoading(orderId))
}
export const updateOrderById = (orderId, status) => (dispatch) => {
    return dispatch(updateOrderByIdLoading({orderId, status}))
}