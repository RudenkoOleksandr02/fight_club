import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productsDataJSON from './../data/productsData.json'

const initialState = {
    data: []
}
/*const loadProductsData = createAsyncThunk(
    'products/loadData',
    async (getProductsData) => {
        return await getProductsData();
    }
);*/
const loadProductsData = () => {
    return productsDataJSON;
};

export const productsSlice = createSlice({
    name: 'productsData',
    initialState,
    reducers: {
        loadProductsDataFromFile: (state) => {
            state.data = loadProductsData();
        }
    },
    /*extraReducers: (builder) => {
        builder
            .addCase(loadProductsData.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    }*/
})

export const {loadProductsDataFromFile} = productsSlice.actions;
export default productsSlice.reducer;

/*export const getProductsData = () => async (dispatch) => {
    await dispatch(loadProductsData(productsDataJSON()));
};*/

