import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import {handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {setUserInfo} from "./checkoutPageSlice";

const initialState = {
    favorite: initialObject,
    userInformation: initialObject,
    ordersHistory: initialObject,
    product: initialObject,
}

const getFavoriteLoading = createAsyncThunk(
    'user/getFavoriteLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await userApi.getFavorite();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const addFavoriteLoading = createAsyncThunk(
    'user/addFavoriteLoading',
    async (productId, {rejectWithValue}) => {
        try {
            return await userApi.addFavorite(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const deleteFavoriteLoading = createAsyncThunk(
    'user/deleteFavoriteLoading',
    async (productId, {rejectWithValue}) => {
        try {
            return await userApi.deleteFavorite(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getUserLoading = createAsyncThunk(
    'user/getUserLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await userApi.getUser();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const updateUserLoading = createAsyncThunk(
    'user/updateUserLoading',
    async (params, {rejectWithValue}) => {
        try {
            return await userApi.updateUser(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getOrdersHistoryLoading = createAsyncThunk(
    'user/getOrdersHistoryLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await userApi.getOrdersHistory();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getProductByIdInOrdersHistoryLoading = createAsyncThunk(
    'user/getProductByIdInOrdersHistoryLoading',
    async (productId, {rejectWithValue}) => {
        try {
            return await userApi.getProductByIdInOrdersHistory(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const userPageSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInformation: (state, action) => {
            state.userInformation.data = action.payload;
        },
        deleteLocalFavorite: (state, action) => {
            state.favorite.data = state.favorite.data.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFavoriteLoading.pending, (state) => {
                handlePending(state, 'favorite');
            })
            .addCase(getFavoriteLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'favorite');
            })
            .addCase(getFavoriteLoading.rejected, (state, action) => {
                handleRejected(state, action, 'favorite');
            })
            .addCase(getUserLoading.pending, (state) => {
                handlePending(state, 'userInformation');
            })
            .addCase(getUserLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'userInformation');
            })
            .addCase(getUserLoading.rejected, (state, action) => {
                handleRejected(state, action, 'userInformation');
            })
            .addCase(getOrdersHistoryLoading.pending, (state) => {
                handlePending(state, 'ordersHistory');
            })
            .addCase(getOrdersHistoryLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'ordersHistory');
            })
            .addCase(getOrdersHistoryLoading.rejected, (state, action) => {
                handleRejected(state, action, 'ordersHistory');
            })
            .addCase(getProductByIdInOrdersHistoryLoading.pending, (state) => {
                handlePending(state, 'product');
            })
            .addCase(getProductByIdInOrdersHistoryLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'product');
            })
            .addCase(getProductByIdInOrdersHistoryLoading.rejected, (state, action) => {
                handleRejected(state, action, 'product');
            })
    }
});


export const {setUserInformation, deleteLocalFavorite} = userPageSlice.actions;
export default userPageSlice.reducer

export const getFavorite = () => (dispatch) => {
    return dispatch(getFavoriteLoading());
}
export const addFavorite = (productId) => (dispatch) => {
    return dispatch(addFavoriteLoading(productId));
}
export const deleteFavorite = (productId) => (dispatch) => {
    return dispatch(deleteFavoriteLoading(productId));
}
export const getUser = () => (dispatch) => {
    return dispatch(getUserLoading())
        .then(response => {
                const userInformation = response.payload
                dispatch(setUserInfo({key: 'name', value: userInformation.username}));
                dispatch(setUserInfo({key: 'surname', value: userInformation.surname}));
                dispatch(setUserInfo({key: 'phone', value: userInformation.phoneNumber}));
                dispatch(setUserInfo({key: 'email', value: userInformation.email}));
        })
}
export const updateUser = (params) => (dispatch) => {
    return dispatch(updateUserLoading(params));
}
export const getOrdersHistory = () => (dispatch) => {
    return dispatch(getOrdersHistoryLoading());
}
export const getProductByIdInOrdersHistory = (productId) => (dispatch) => {
    return dispatch(getProductByIdInOrdersHistoryLoading(productId));
}