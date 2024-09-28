import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const initialState = {
    reviews: initialObject
};

const searchReviewsLoading = createAsyncThunk(
    'admin/searchReviewsLoading',
    async (params, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.searchReviews(params)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const deleteReviewByIdLoading = createAsyncThunk(
    'admin/deleteReviewByIdLoading',
    async (reviewId, {rejectWithValue}) => {
        try {
            return await adminApi.deleteReviewById(reviewId)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const deleteAllReviewsByUserIdLoading = createAsyncThunk(
    'admin/deleteAllReviewsByUserIdLoading',
    async (userId, {rejectWithValue}) => {
        try {
            return await adminApi.deleteAllReviewsByUserId(userId)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const adminReviewsSlice = createSlice({
    name: 'adminReviews', initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchReviewsLoading.pending, (state) => {
                handlePending(state, 'reviews');
            })
            .addCase(searchReviewsLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'reviews');
            })
            .addCase(searchReviewsLoading.rejected, (state, action) => {
                handleRejected(state, action, 'reviews');
            })
    }
});

export const {} = adminReviewsSlice.actions;
export default adminReviewsSlice.reducer;

export const searchReviews = (params) => (dispatch) => {
    return dispatch(searchReviewsLoading(params))
}
export const deleteReviewById = (reviewId, params) => (dispatch) => {
    return dispatch(deleteReviewByIdLoading(reviewId))
        .then(() => dispatch(searchReviewsLoading(params)))
}
export const deleteAllReviewsByUserId = (userId, params) => (dispatch) => {
    return dispatch(deleteAllReviewsByUserIdLoading(userId))
        .then(() => dispatch(searchReviewsLoading(params)))
}