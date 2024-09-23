import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import reviewsApi from "../api/reviewsApi";
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../common/utils/forSlice";

const initialState = {
    reviews: initialObject
}
const getReviewsInProductLoading = createAsyncThunk(
    'reviewsSlice/getReviewsInProductLoading',
    async ({productId, page, pageSize}) => {
        await delay(300);
        return reviewsApi.getReviewsInProduct(productId, page, pageSize);
    }
);
const postReviewsLoading = createAsyncThunk(
    'reviewsSlice/postReviewsLoading',
    async (params) => {
        return reviewsApi.postReviews(params);
    }
);

export const reviewsSlice = createSlice({
    name: 'reviewsSlice',
    initialState,
    reducers: {
        addReview: (state, action) => {
            state.reviews.data.reviews = [...state.reviews.data.reviews, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviewsInProductLoading.pending, (state) => (
                handlePending(state, 'reviews'))
            )
            .addCase(getReviewsInProductLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'reviews'))
            )
            .addCase(getReviewsInProductLoading.rejected, (state, action) => (
                handleRejected(state, action, 'reviews'))
            )
    }
})

export const {addReview} = reviewsSlice.actions;
export default reviewsSlice.reducer;

export const getReviewsInProduct = (productId, page, pageSize) => async (dispatch) => {
    return await dispatch(getReviewsInProductLoading({productId, page, pageSize}));
};
export const postReviews = (params) => async (dispatch) => {
    return await dispatch(postReviewsLoading(params));
};
