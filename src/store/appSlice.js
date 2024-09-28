import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getIsAuth} from './authSlice';
import {getIsAdminAuth} from "./adminSlices/adminAuthSlice";
import {getUserShoppingCart} from "./pageSlices/cartPageSlice";
import {getCategory} from "./navigationSlice";

const initialState = {
    initialized: false
};

export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await dispatch(getIsAuth());
            await dispatch(getIsAdminAuth());
            await dispatch(getUserShoppingCart());
            await dispatch(getCategory());
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.initialized = true;
            });
    },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
