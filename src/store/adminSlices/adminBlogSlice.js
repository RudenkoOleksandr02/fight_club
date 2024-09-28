import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const getAdminBlogsLoading = createAsyncThunk(
    'admin/getAdminBlogsLoading',
    async (_, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getBlogs();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getAdminBlogByIdLoading = createAsyncThunk(
    'admin/getAdminBlogByIdLoading',
    async (blogId, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getBlogById(blogId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const updateAdminBlogByIdLoading = createAsyncThunk(
    'admin/updateAdminBlogByIdLoading',
    async ({blogId, params}, {rejectWithValue}) => {
        try {
            return await adminApi.updateBlogById(blogId, params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getProductsBySearchLoading = createAsyncThunk(
    'admin/getProductBySearchLoading',
    async (searchTerm, {rejectWithValue}) => {
        try {
            return await adminApi.getProductsBySearch(searchTerm);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const addBlogLoading = createAsyncThunk(
    'admin/addBlogLoading',
    async (params, {rejectWithValue}) => {
        try {
            return await adminApi.addBlog(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const deleteBlogByIdLoading = createAsyncThunk(
    'admin/deleteBlogByIdLoading',
    async (blogId, {rejectWithValue}) => {
        try {
            return await adminApi.deleteBlogById(blogId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    blogs: initialObject,
    blog: initialObject,
    productsSearch: initialObject
};

const adminBlogSlice = createSlice({
    name: 'adminBlog', initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminBlogsLoading.pending, (state) => {
                handlePending(state, 'blogs')
            })
            .addCase(getAdminBlogsLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'blogs')
            })
            .addCase(getAdminBlogsLoading.rejected, (state, action) => {
                handleRejected(state, action, 'blogs')
            })
            .addCase(getAdminBlogByIdLoading.pending, (state) => {
                handlePending(state, 'blog')
            })
            .addCase(getAdminBlogByIdLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'blog')
            })
            .addCase(getAdminBlogByIdLoading.rejected, (state, action) => {
                handleRejected(state, action, 'blog')
            })
            .addCase(updateAdminBlogByIdLoading.pending, (state) => {
                handlePending(state, 'blog')
            })
            .addCase(updateAdminBlogByIdLoading.fulfilled, (state, action) => {
                state.blog.loading = false
            })
            .addCase(updateAdminBlogByIdLoading.rejected, (state, action) => {
                handleRejected(state, action, 'blog')
            })
            .addCase(getProductsBySearchLoading.pending, (state) => {
                handlePending(state, 'productsSearch')
            })
            .addCase(getProductsBySearchLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'productsSearch')
            })
            .addCase(getProductsBySearchLoading.rejected, (state, action) => {
                handleRejected(state, action, 'productsSearch')
            })
            .addCase(addBlogLoading.pending, (state) => (
                handlePending(state, 'blogs'))
            )
            .addCase(addBlogLoading.fulfilled, (state, action) => {
                state.blogs.loading = false;
            })
            .addCase(addBlogLoading.rejected, (state, action) => (
                handleRejected(state, action, 'blogs'))
            )
    }
});

export const {} = adminBlogSlice.actions;
export default adminBlogSlice.reducer;

export const getAdminBlogs = () => async (dispatch) => {
    return dispatch(getAdminBlogsLoading())
}
export const getAdminBlogById = (blogId) => async (dispatch) => {
    return dispatch(getAdminBlogByIdLoading(blogId))
}
export const updateAdminBlogById = (blogId, params) => async (dispatch) => {
    return dispatch(updateAdminBlogByIdLoading({blogId, params}))
        .then(() => dispatch(getAdminBlogByIdLoading(blogId)))
}
export const getProductsBySearch = (searchTerm) => async (dispatch) => {
    return dispatch(getProductsBySearchLoading(searchTerm))
}
export const addBlog = (params) => async (dispatch) => {
    return await dispatch(addBlogLoading(params));
};
export const deleteBlogById = (blogId) => async (dispatch) => {
    return await dispatch(deleteBlogByIdLoading(blogId));
};