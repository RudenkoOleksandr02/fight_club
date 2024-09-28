import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import blogApi from "../../api/blogApi";

const initialState = {
    blog: initialObject,
    blogs: initialObject
}
const getBlogsLoading = createAsyncThunk(
    'blogPage/getBlogsLoading',
    async (_, {rejectWithValue}) => {
        try {
            await delay(500);
            return await blogApi.getBlogs();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getBlogByIdLoading = createAsyncThunk(
    'blogPage/getBlogByIdLoading',
    async (blogId, {rejectWithValue}) => {
        try {
            await delay(500);
            return await blogApi.getBlogById(blogId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const blogPageSlice = createSlice({
    name: 'blogPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogsLoading.pending, (state) => (
                handlePending(state, 'blogs'))
            )
            .addCase(getBlogsLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'blogs'))
            )
            .addCase(getBlogsLoading.rejected, (state, action) => (
                handleRejected(state, action, 'blogs'))
            )
            .addCase(getBlogByIdLoading.pending, (state) => (
                handlePending(state, 'blog'))
            )
            .addCase(getBlogByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'blog'))
            )
            .addCase(getBlogByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'blog'))
            )
    }
})

export const {} = blogPageSlice.actions;
export default blogPageSlice.reducer;

export const getBlogs = () => async (dispatch) => {
    return await dispatch(getBlogsLoading());
};
export const getBlogById = (blogId) => async (dispatch) => {
    return await dispatch(getBlogByIdLoading(blogId));
};

