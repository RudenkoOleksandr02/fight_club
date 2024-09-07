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
    async () => {
        return userApi.updateUser();
    }
)

export const userPageSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
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
            .addCase(addFavoriteLoading.pending, (state) => {
                handlePending(state, 'favorite');
            })
            .addCase(addFavoriteLoading.fulfilled, (state) => {
                state.favorite.loading = false;
            })
            .addCase(addFavoriteLoading.rejected, (state, action) => {
                handleRejected(state, action, 'favorite');
            })
            .addCase(deleteFavoriteLoading.pending, (state) => {
                handlePending(state, 'favorite');
            })
            .addCase(deleteFavoriteLoading.fulfilled, (state) => {
                state.favorite.loading = false;
            })
            .addCase(deleteFavoriteLoading.rejected, (state, action) => {
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
            .addCase(updateUserLoading.pending, (state) => {
                handlePending(state, 'userInformation');
            })
            .addCase(updateUserLoading.fulfilled, (state) => {
                state.userInformation.loading = false;
            })
            .addCase(updateUserLoading.rejected, (state, action) => {
                handleRejected(state, action, 'userInformation');
            })
    }
});


export const {} = userPageSlice.actions;
export default userPageSlice.reducer

export const getFavorite = () => async (dispatch) => {
    return await dispatch(getFavoriteLoading());
}
export const addFavorite = (productId) => async (dispatch) => {
    await dispatch(addFavoriteLoading(productId));
    return await dispatch(getFavorite());
}
export const deleteFavorite = (productId) => async (dispatch) => {
    await dispatch(deleteFavoriteLoading(productId));
    return await dispatch(getFavorite());
}
export const getUser = () => async (dispatch) => {
    return await dispatch(getUserLoading());
}
export const updateUser = () => async (dispatch) => {
    return await dispatch(updateUserLoading());
}