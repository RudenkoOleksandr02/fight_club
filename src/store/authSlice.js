import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {authorizationApi} from '../api/authorizationApi';
import {clearCart} from './pageSlices/cartPageSlice';

const registerUser = createAsyncThunk(
    'auth/register',
    async (params, {rejectWithValue}) => {
        try {
            return await authorizationApi.register(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

const loginUser = createAsyncThunk(
    'auth/login', async (params, {rejectWithValue}) => {
        try {
            return await authorizationApi.login(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

const logoutUser = createAsyncThunk(
    'auth/logout', async (_, {dispatch, rejectWithValue}) => {
        try {
            const response = await authorizationApi.logout();
            dispatch(clearCart());
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

const getIsAuthLoading = createAsyncThunk(
    'auth/getAuthLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await authorizationApi.getAuth();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const initialState = {
    isAuth: false,
    loading: true,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuth = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getIsAuthLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIsAuthLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = true;
            })
            .addCase(getIsAuthLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {} = authSlice.actions;
export default authSlice.reducer;

export const login = (params) => async (dispatch) => {
    return await dispatch(loginUser(params))
}
export const register = (params) => async (dispatch) => {
    return await dispatch(registerUser(params))
}
export const logout = () => async (dispatch) => {
    return await dispatch(logoutUser())
}
export const getIsAuth = () => async (dispatch) => {
    return await dispatch(getIsAuthLoading())
}
