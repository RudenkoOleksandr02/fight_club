import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {adminApi} from "../../api/adminApi";

const initialState = {
    isAuthAdmin: false,
    loading: true,
    error: null
}

const getIsAdminAuthLoading = createAsyncThunk(
    'admin/getAdminAuthLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await adminApi.getAdminAuth();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const adminAuthSlice = createSlice({
    name: 'adminAuth', initialState,
    reducers: {
        logoutAdmin: state => {
            state.isAuthAdmin = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIsAdminAuthLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIsAdminAuthLoading.fulfilled, (state) => {
                state.loading = false;
                state.isAuthAdmin = true;
            })
            .addCase(getIsAdminAuthLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {logoutAdmin} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

export const getIsAdminAuth = () => (dispatch, getState) => {
    const state = getState();
    const isAuth = state.auth.isAuth;

    if (isAuth) {
        return dispatch(getIsAdminAuthLoading());
    } else {
        return dispatch(logoutAdmin())
    }
}

