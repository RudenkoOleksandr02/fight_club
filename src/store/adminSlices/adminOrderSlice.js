import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const initialState = {
    orders: initialObject,
    promocode: initialObject,
    order: initialObject,
    adminFilterPanel: initialObject
}

const getOrdersLoading = createAsyncThunk(
    'adminOrder/getAdminOrdersLoading',
    async (_, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getOrders();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const loadPromocodesById = createAsyncThunk(
    'adminOrder/loadPromocodesById',
    async (promoId, {rejectWithValue}) => {
        try {
            return await adminApi.getPromocodesById(promoId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getOrderByIdLoading = createAsyncThunk(
    'adminOrder/getOrderByIdLoading',
    async (orderId, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getOrderById(orderId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const updateOrderByIdLoading = createAsyncThunk(
    'adminOrder/updateOrderByIdLoading',
    async ({orderId, params}, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.updateOrderById(orderId, params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getAdminOrderFilterPanelLoading = createAsyncThunk(
    'adminOrder/getAdminOrderFilterPanelLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await adminApi.getAdminOrderFilterPanel()
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getOrdersByAdminFilterPanelLoading = createAsyncThunk(
    'adminOrder/getOrdersByAdminFilterPanelLoading',
    async (params, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getOrdersByAdminFilterPanel(params)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const adminOrderSlice = createSlice({
    name: 'adminOrder', initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderByIdLoading.pending, (state) => (
                handlePending(state, 'order'))
            )
            .addCase(getOrderByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'order'))
            )
            .addCase(getOrderByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'order'))
            )
            .addCase(updateOrderByIdLoading.pending, (state) => (
                handlePending(state, 'order'))
            )
            .addCase(updateOrderByIdLoading.fulfilled, (state, action) => {
                state.order.loading = false;
            })
            .addCase(updateOrderByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'order'))
            )
            .addCase(getOrdersByAdminFilterPanelLoading.pending, (state) => (
                handlePending(state, 'orders'))
            )
            .addCase(getOrdersByAdminFilterPanelLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'orders'))
            )
            .addCase(getOrdersByAdminFilterPanelLoading.rejected, (state, action) => (
                handleRejected(state, action, 'orders'))
            )
            .addCase(getAdminOrderFilterPanelLoading.pending, (state) => (
                handlePending(state, 'adminFilterPanel'))
            )
            .addCase(getAdminOrderFilterPanelLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'adminFilterPanel'))
            )
            .addCase(getAdminOrderFilterPanelLoading.rejected, (state, action) => (
                handleRejected(state, action, 'adminFilterPanel'))
            )
            .addCase(loadPromocodesById.pending, (state) => {
                handlePending(state, 'promocode');
            })
            .addCase(loadPromocodesById.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'promocode'))
            )
            .addCase(loadPromocodesById.rejected, (state, action) => (
                handleRejected(state, action, 'promocode'))
            )
    }
})

export const {} = adminOrderSlice.actions;
export default adminOrderSlice.reducer;

export const getPromocodeById = (promoId) => (dispatch) => {
    return dispatch(loadPromocodesById(promoId));
};
export const getOrderById = (orderId) => (dispatch) => {
    return dispatch(getOrderByIdLoading(orderId))
}
export const updateOrderById = (orderId, params) => (dispatch) => {
    return dispatch(updateOrderByIdLoading({orderId, params}))
        .then(() => dispatch(getOrderById(orderId)));
}
export const getAdminOrderFilterPanel = () => (dispatch) => {
    return dispatch(getAdminOrderFilterPanelLoading())
}
export const getOrdersByAdminFilterPanel = (params) => (dispatch) => {
    return dispatch(getOrdersByAdminFilterPanelLoading(params))
}