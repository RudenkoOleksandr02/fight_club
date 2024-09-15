import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { delay, handleFulfilled, handlePending, handleRejected, initialObject } from "../../common/utils/forSlice";
import { adminApi } from "../../api/adminApi";

// Thunks for PromoCodes
const getPromocodesLoading = createAsyncThunk(
    'admin/getPromocodesLoading',
    async (_, { rejectWithValue }) => {
        await delay(500);
        try {
            return await adminApi.getPromocodes();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const getPromocodeByIdLoading = createAsyncThunk(
    'admin/getPromocodeByIdLoading',
    async (promoId, { rejectWithValue }) => {
        await delay(500);
        try {
            return await adminApi.getPromocodeById(promoId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const updatePromocodeByIdLoading = createAsyncThunk(
    'admin/updatePromocodeByIdLoading',
    async ({ promoId, params }, { rejectWithValue }) => {
        try {
            return await adminApi.updatePromocodeById(promoId, params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const addPromocodeLoading = createAsyncThunk(
    'admin/addPromocodeLoading',
    async (params) => {
        return adminApi.addPromocode(params);
    }
);

// Initial State
const initialState = {
    promocodes: initialObject,
    promocode: initialObject
};

// PromoCode Slice
const adminPromoCodeSlice = createSlice({
    name: 'adminPromocode',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPromocodesLoading.pending, (state) => {
                handlePending(state, 'promocodes');
            })
            .addCase(getPromocodesLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'promocodes');
            })
            .addCase(getPromocodesLoading.rejected, (state, action) => {
                handleRejected(state, action, 'promocodes');
            })
            .addCase(getPromocodeByIdLoading.pending, (state) => {
                handlePending(state, 'promocode');
            })
            .addCase(getPromocodeByIdLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'promocode');
            })
            .addCase(getPromocodeByIdLoading.rejected, (state, action) => {
                handleRejected(state, action, 'promocode');
            })
            .addCase(updatePromocodeByIdLoading.pending, (state) => {
                handlePending(state, 'promocode');
            })
            .addCase(updatePromocodeByIdLoading.fulfilled, (state) => {
                state.promocode.loading = false;
            })
            .addCase(updatePromocodeByIdLoading.rejected, (state, action) => {
                handleRejected(state, action, 'promocode');
            })
            .addCase(addPromocodeLoading.pending, (state) => {
                handlePending(state, 'promocodes');
            })
            .addCase(addPromocodeLoading.fulfilled, (state) => {
                state.promocodes.loading = false;
            })
            .addCase(addPromocodeLoading.rejected, (state, action) => {
                handleRejected(state, action, 'promocodes');
            });
    }
});

export const {} = adminPromoCodeSlice.actions;
export default adminPromoCodeSlice.reducer;

// Action Creators
export const getAdminPromocodes = () => async (dispatch) => {
    return dispatch(getPromocodesLoading());
};

export const getAdminPromocodeById = (promoId) => async (dispatch) => {
    return dispatch(getPromocodeByIdLoading(promoId));
};

export const updateAdminPromocodeById = (promoId, params) => async (dispatch) => {
    return dispatch(updatePromocodeByIdLoading({ promoId, params }))
        .then(() => dispatch(getPromocodeByIdLoading(promoId)));
};

export const addAdminPromocode = (params) => async (dispatch) => {
    return await dispatch(addPromocodeLoading(params));
};
