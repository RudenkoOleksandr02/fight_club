import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {delay, handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";
import {adminApi} from "../../api/adminApi";

const getAdminCharacteristicsLoading = createAsyncThunk(
    'admin/getAdminCharacteristicsLoading',
    async (_, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getCharacteristics();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getAdminCharacteristicByIdLoading = createAsyncThunk(
    'admin/getAdminCharacteristicByIdLoading',
    async (characteristicId, {rejectWithValue}) => {
        try {
            await delay(500);
            return await adminApi.getCharacteristicById(characteristicId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const updateAdminCharacteristicByIdLoading = createAsyncThunk(
    'admin/updateAdminCharacteristicByIdLoading',
    async ({characteristicId, params}, {rejectWithValue}) => {
        try {
            return await adminApi.updateCharacteristicById(characteristicId, params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const addAdminCharacteristicLoading = createAsyncThunk(
    'admin/addAdminCharacteristicLoading',
    async (params, {rejectWithValue}) => {
        try {
            return await adminApi.addCharacteristic(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getCharacteristicTitlesBySearchTermLoading = createAsyncThunk(
    'admin/getCharacteristicTitlesBySearchTermLoading',
    async (searchTerm, {rejectWithValue}) => {
        try {
            return await adminApi.getCharacteristicTitlesBySearchTerm(searchTerm);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const getCharacteristicDescsByTitleLoading = createAsyncThunk(
    'admin/getCharacteristicDescsByTitleLoading',
    async (characteristicTitle, {rejectWithValue}) => {
        try {
            return await adminApi.getCharacteristicDescsByTitle(characteristicTitle);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const deleteCharacteristicByIdLoading = createAsyncThunk(
    'admin/deleteCharacteristicByIdLoading',
    async (characteristicId, {rejectWithValue}) => {
        try {
            return await adminApi.deleteCharacteristicById(characteristicId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    characteristics: initialObject,
    characteristic: initialObject,
    characteristicTitles: initialObject,
    characteristicDescs: initialObject,
};

const adminCharacteristicsSlice = createSlice({
    name: 'adminCharacteristics', initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminCharacteristicsLoading.pending, (state) => {
                handlePending(state, 'characteristics')
            })
            .addCase(getAdminCharacteristicsLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'characteristics')
            })
            .addCase(getAdminCharacteristicsLoading.rejected, (state, action) => {
                handleRejected(state, action, 'characteristics')
            })
            .addCase(getAdminCharacteristicByIdLoading.pending, (state) => {
                handlePending(state, 'characteristic')
            })
            .addCase(getAdminCharacteristicByIdLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'characteristic')
            })
            .addCase(getAdminCharacteristicByIdLoading.rejected, (state, action) => {
                handleRejected(state, action, 'characteristic')
            })
            .addCase(getCharacteristicTitlesBySearchTermLoading.pending, (state) => {
                handlePending(state, 'characteristicTitles')
            })
            .addCase(getCharacteristicTitlesBySearchTermLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'characteristicTitles')
            })
            .addCase(getCharacteristicTitlesBySearchTermLoading.rejected, (state, action) => {
                handleRejected(state, action, 'characteristicTitles')
            })
            .addCase(getCharacteristicDescsByTitleLoading.pending, (state) => {
                handlePending(state, 'characteristicDescs')
            })
            .addCase(getCharacteristicDescsByTitleLoading.fulfilled, (state, action) => {
                handleFulfilled(state, action, 'characteristicDescs')
            })
            .addCase(getCharacteristicDescsByTitleLoading.rejected, (state, action) => {
                handleRejected(state, action, 'characteristicDescs')
            })
    }
});

export const {} = adminCharacteristicsSlice.actions;
export default adminCharacteristicsSlice.reducer;

export const getAdminCharacteristics = () => async (dispatch) => {
    return dispatch(getAdminCharacteristicsLoading())
}
export const getAdminCharacteristicById = (characteristicId) => async (dispatch) => {
    return dispatch(getAdminCharacteristicByIdLoading(characteristicId))
}
export const updateAdminCharacteristicById = (characteristicId, params) => async (dispatch) => {
    return dispatch(updateAdminCharacteristicByIdLoading({characteristicId, params}))
}
export const addAdminCharacteristic = (params) => async (dispatch) => {
    return dispatch(addAdminCharacteristicLoading(params))
        .then(() => dispatch(getAdminCharacteristicsLoading()))
};
export const getCharacteristicTitlesBySearchTerm = (searchTerm) => (dispatch) => {
    return dispatch(getCharacteristicTitlesBySearchTermLoading(searchTerm))
}
export const getCharacteristicDescsByTitle = (characteristicTitle) => (dispatch) => {
    return dispatch(getCharacteristicDescsByTitleLoading(characteristicTitle))
}
export const deleteCharacteristicById = (characteristicId) => (dispatch) => {
    return dispatch(deleteCharacteristicByIdLoading(characteristicId))
}
