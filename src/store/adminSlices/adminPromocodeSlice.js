import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { delay, handleFulfilled, handlePending, handleRejected, initialObject } from "../../common/utils/forSlice";
import { adminApi } from "../../api/adminApi";

// Thunks for PromoCodes
const getPromocodesLoading = createAsyncThunk(
    'admin/getPromocodesLoading',
    async (_, { rejectWithValue }) => {
        try {
            await delay(500);
            return await adminApi.getPromocodes();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const getPromocodeByIdLoading = createAsyncThunk(
    'admin/getPromocodeByIdLoading',
    async (promoId, { rejectWithValue }) => {
        try {
            await delay(500);
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
    async (params, { rejectWithValue }) => {
        try {
            return await adminApi.addPromocode(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const deletePromocodeByIdLoading = createAsyncThunk(
    'admin/deletePromocodeByIdLoading',
    async (promoId, { rejectWithValue }) => {
        try {
            return await adminApi.deletePromocodeById(promoId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    promocodes: initialObject,
    promocode: initialObject
};

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

export const getAdminPromocodes = () => (dispatch) => {
    return dispatch(getPromocodesLoading());
};
export const getAdminPromocodeById = (promoId) => (dispatch) => {
    return dispatch(getPromocodeByIdLoading(promoId));
};
export const updateAdminPromocodeById = (promoId, params) => (dispatch) => {
    return dispatch(updatePromocodeByIdLoading({ promoId, params }))
        .then(() => dispatch(getPromocodeByIdLoading(promoId)));
};
export const addAdminPromocode = (params) => (dispatch) => {
    return dispatch(addPromocodeLoading(params));
};
export const deletePromocodeById = (promoId) => (dispatch) => {
    return dispatch(deletePromocodeByIdLoading(promoId));
}
