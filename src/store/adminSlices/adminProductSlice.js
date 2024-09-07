import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const getProductsByAdminFilterLoading = createAsyncThunk(
    'adminProduct/getProductsByAdminFilterLoading',
    async (params, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getProductsByAdminFilter(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getProductByIdLoading = createAsyncThunk(
    'adminProduct/getProductByIdLoading',
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
    'adminProduct/putProductByIdLoading',
    async ({productId, params}, {rejectWithValue}) => {
        try {
            return await adminApi.putProductById(productId, params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const postImagesByProductIdLoading = createAsyncThunk(
    'adminProduct/postImagesByProductIdLoading',
    async ({productId, files}, {rejectWithValue}) => {
        try {
            return await adminApi.postImagesByProductId(productId, files);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const removeImagesByProductIdLoading = createAsyncThunk(
    'adminProduct/removeImagesByProductIdLoading',
    async ({productId, url}, {rejectWithValue}) => {
        try {
            return await adminApi.removeImagesByProductId(productId, url);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getAdminFilterPanelLoading = createAsyncThunk(
    'adminProduct/getAdminFilterPanelLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await adminApi.getAdminFilterPanel();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getCharacteristicSearchLoading = createAsyncThunk(
    'adminProduct/getCharacteristicSearchLoading',
    async (searchTerm, {rejectWithValue}) => {
        try {
            return await adminApi.getCharacteristicSearch(searchTerm);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getCharacteristicValuesLoading = createAsyncThunk(
    'adminProduct/getCharacteristicValuesLoading',
    async (characteristicTitle, {rejectWithValue}) => {
        try {
            return await adminApi.getCharacteristicValues(characteristicTitle);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const searchCategoriesLoading = createAsyncThunk(
    'adminProduct/searchCategoriesLoading',
    async (searchTerm, {rejectWithValue}) => {
        try {
            return await adminApi.searchCategories(searchTerm);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getCharacteristicByIdLoading = createAsyncThunk(
    'adminProduct/getCharacteristicByIdLoading',
    async (characteristicId, {rejectWithValue}) => {
        try {
            return await adminApi.getCharacteristicById(characteristicId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const importFromExcelLoading = createAsyncThunk(
    'adminProduct/importFromExcelLoading',
    async (file, {rejectWithValue}) => {
        try {
            return await adminApi.importFromExcel(file);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    product: initialObject,
    products: initialObject,
    category: initialObject,
    characteristicsValues: initialObject,
    characteristicsOptions: initialObject,
    characteristicById: initialObject,
    categoriesSearch: initialObject,
    adminFilterPanel: initialObject,
}

const adminProductSlice = createSlice({
    name: 'adminProduct', initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsByAdminFilterLoading.pending, (state) => (
                handlePending(state, 'products'))
            )
            .addCase(getProductsByAdminFilterLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'products'))
            )
            .addCase(getProductsByAdminFilterLoading.rejected, (state, action) => (
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
            .addCase(removeImagesByProductIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'product'))
            )
            .addCase(removeImagesByProductIdLoading.pending, (state) => (
                handlePending(state, 'product'))
            )
            .addCase(removeImagesByProductIdLoading.fulfilled, (state) => {
                state.product.loading = false;
            })
            .addCase(getAdminFilterPanelLoading.pending, (state) => {
                handlePending(state, 'adminFilterPanel');
            })
            .addCase(getAdminFilterPanelLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'adminFilterPanel'))
            )
            .addCase(getAdminFilterPanelLoading.rejected, (state, action) => (
                handleRejected(state, action, 'adminFilterPanel'))
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
            .addCase(searchCategoriesLoading.pending, (state) => {
                handlePending(state, 'categoriesSearch');
            })
            .addCase(searchCategoriesLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'categoriesSearch'))
            )
            .addCase(searchCategoriesLoading.rejected, (state, action) => (
                handleRejected(state, action, 'categoriesSearch'))
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
            .addCase(importFromExcelLoading.pending, (state) => (
                handlePending(state, 'products'))
            )
            .addCase(importFromExcelLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'products'))
            )
            .addCase(importFromExcelLoading.rejected, (state, action) => (
                handleRejected(state, action, 'products'))
            )
    }
})

export default adminProductSlice.reducer;

export const getProductsByAdminFilter = (params) => (dispatch) => {
    return dispatch(getProductsByAdminFilterLoading(params));
};
export const getProductById = (productId) => (dispatch) => {
    return dispatch(getProductByIdLoading(productId));
};
export const putProductById = (productId, params) => (dispatch) => {
    return dispatch(putProductByIdLoading({productId, params}));
};
export const postImagesByProductId = (productId, files) => (dispatch) => {
    return dispatch(postImagesByProductIdLoading({productId, files}));
};
export const removeImagesByProductId = (productId, url) => (dispatch) => {
    return dispatch(removeImagesByProductIdLoading({productId, url}));
};
export const getAdminFilterPanel = () => (dispatch) => {
    return dispatch(getAdminFilterPanelLoading())
}
export const getCharacteristicSearch = (searchTerm) => (dispatch) => {
    return dispatch(getCharacteristicSearchLoading(searchTerm))
}
export const getCharacteristicValues = (characteristicTitle) => (dispatch) => {
    return dispatch(getCharacteristicValuesLoading(characteristicTitle))
}
export const searchCategories = (searchTerm) => (dispatch) => {
    return dispatch(searchCategoriesLoading(searchTerm))
}
export const importFromExcel = (file) => (dispatch) => {
    return dispatch(importFromExcelLoading(file));
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
export const toggleIsNew = (productId, boolean) => async (dispatch) => {
    try {
        const response = await adminApi.toggleIsNew(productId, boolean);
        dispatch({
            type: 'TOGGLE_IS_NEW_SUCCESS',
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: 'TOGGLE_IS_NEW_FAILURE',
            payload: error.message,
        });
    }
};
