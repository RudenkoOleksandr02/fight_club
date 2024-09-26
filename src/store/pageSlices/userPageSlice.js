import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import {handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";

const initialState = {
    favorite: initialObject,
    userInformation: initialObject
}

const getFavoriteLoading = createAsyncThunk(
    'user/getFavoriteLoading',
    async () => {
        return userApi.getFavorite();
    }
)
const addFavoriteLoading = createAsyncThunk(
    'user/addFavoriteLoading',
    async (productId) => {
        return userApi.addFavorite(productId);
    }
)
const deleteFavoriteLoading = createAsyncThunk(
    'user/deleteFavoriteLoading',
    async (productId) => {
        return userApi.deleteFavorite(productId);
    }
)
const getUserLoading = createAsyncThunk(
    'user/getUserLoading',
    async () => {
        return userApi.getUser();
    }
)
const updateUserLoading = createAsyncThunk(
    'user/updateUserLoading',
    async (params) => {
        return userApi.updateUser(params);
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
    return dispatch(getUserLoading());
}
export const updateUser = (params) => (dispatch) => {
    return dispatch(updateUserLoading(params));
}