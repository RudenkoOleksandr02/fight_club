import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const initialState = {
    adminAuth: {...initialObject, data: false}
}

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

const adminAuthSlice = createSlice({
    name: 'adminAuth', initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIsAdminAuthLoading.pending, (state) => {
                handlePending(state, 'adminAuth')
            })
            .addCase(getIsAdminAuthLoading.fulfilled, (state) => {
                state.adminAuth.loading = false;
                state.adminAuth.data = true;
            })
            .addCase(getIsAdminAuthLoading.rejected, (state, action) => {
                handleRejected(state, action, 'adminAuth')
            })
    }
})

export const {} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

export const getIsAdminAuth = () => async (dispatch) => {
    return dispatch(getIsAdminAuthLoading());
}

