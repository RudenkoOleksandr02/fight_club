import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counterValue',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        addValue: (state, action) => {
            state.count = action.payload
        }
    }
})

export const {increment, decrement, addValue} = counterSlice.actions;
export default counterSlice.reducer;