import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import brandApi from "../../api/brandApi";

const initialState = {
    brand: initialObject,
    brands: initialObject
}
const getBrandsLoading = createAsyncThunk(
    'brandPage/getBrandsLoading',
    async (_, {rejectWithValue}) => {
        try {
            await delay(500);
            return await brandApi.getBrands();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getBrandByIdLoading = createAsyncThunk(
    'brandPage/getBrandByIdLoading',
    async (brandId, {rejectWithValue}) => {
        try {
            await delay(500);
            return await brandApi.getBrandById(brandId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const brandPageSlice = createSlice({
    name: 'brandPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrandsLoading.pending, (state) => (
                handlePending(state, 'brands'))
            )
            .addCase(getBrandsLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'brands'))
            )
            .addCase(getBrandsLoading.rejected, (state, action) => (
                handleRejected(state, action, 'brands'))
            )
            .addCase(getBrandByIdLoading.pending, (state) => (
                handlePending(state, 'brand'))
            )
            .addCase(getBrandByIdLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'brand'))
            )
            .addCase(getBrandByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'brand'))
            )
    }
})

export const {} = brandPageSlice.actions;
export default brandPageSlice.reducer;

export const getBrands = () => async (dispatch) => {
    return await dispatch(getBrandsLoading());
};
export const getBrandById = (brandId) => async (dispatch) => {
    return await dispatch(getBrandByIdLoading(brandId));
};