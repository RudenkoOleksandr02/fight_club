import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {cashbackApi} from "../api/cashbackApi";
import {handleFulfilled, handlePending, handleRejected, initialObject} from "../common/utils/forSlice";

const initialState = {
    balance: initialObject
}
const getBalanceLoading = createAsyncThunk(
    'cashback/getBalanceLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await cashbackApi.getBalance();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getBalanceByPhoneLoading = createAsyncThunk(
    'cashback/getBalanceByPhoneLoading',
    async (phoneNumber, {rejectWithValue}) => {
        try {
            return await cashbackApi.getBalanceByPhone(phoneNumber);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const cashbackSlice = createSlice({
    name: 'cashbackSlice',
    initialState,
    reducers: {
        setBalance(state, action) {
            state.balance.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBalanceLoading.pending, (state) => (
                handlePending(state, 'balance'))
            )
            .addCase(getBalanceLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'balance'))
            )
            .addCase(getBalanceLoading.rejected, (state, action) => (
                handleRejected(state, action, 'balance'))
            )
            .addCase(getBalanceByPhoneLoading.pending, (state) => (
                handlePending(state, 'balance'))
            )
            .addCase(getBalanceByPhoneLoading.fulfilled, (state, action) => (
                handleFulfilled(state, action, 'balance'))
            )
            .addCase(getBalanceByPhoneLoading.rejected, (state, action) => (
                handleRejected(state, action, 'balance'))
            )
    }
})

export const {setBalance} = cashbackSlice.actions;
export default cashbackSlice.reducer;

export const getBalance = () => (dispatch) => {
    return dispatch(getBalanceLoading());
};
export const getBalanceByPhone = (phoneNumber) => async (dispatch) => {
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    return await dispatch(getBalanceByPhoneLoading(encodedPhoneNumber));
};
