import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shoppingCartApi } from '../api/shoppingCartApi';

const getUserShoppingCartLoading = createAsyncThunk(
    'cart/getUserShoppingCartLoading',
    async (_, { rejectWithValue }) => {
        try {
            return await shoppingCartApi.getUserShoppingCart();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const addProductLoading = createAsyncThunk(
    'cart/addProductLoading',
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await shoppingCartApi.addProduct(productId);
            await dispatch(getUserShoppingCartLoading());
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const changeProductAmountLoading = createAsyncThunk(
    'cart/changeProductAmountLoading',
    async (params, { dispatch, rejectWithValue }) => {
        try {
            const response = await shoppingCartApi.changeProductAmount(params);
            await dispatch(getUserShoppingCartLoading());
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const removeProductLoading = createAsyncThunk(
    'cart/removeProductLoading',
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await shoppingCartApi.removeProduct(productId);
            await dispatch(getUserShoppingCartLoading());
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    productsInCart: [], // {productId: 1, image: "img", name: "name", price: "price", quantity: 2}
    loading: true,
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        putProductInCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.productsInCart.find(item => item.productId === product.productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.productsInCart.push({ ...product, quantity: 1 });
            }
        },
        changeProductAmountInCart: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.productsInCart.find(item => item.productId === productId);

            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    state.productsInCart = state.productsInCart.filter(item => item.productId !== productId);
                }
            }
        },
        deleteProductFromCart: (state, action) => {
            const productId = action.payload;
            state.productsInCart = state.productsInCart.filter(item => item.productId !== productId);
        },
        clearCart: (state) => {
            state.productsInCart = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserShoppingCartLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserShoppingCartLoading.fulfilled, (state, action) => {
                state.loading = false;
                state.productsInCart = action.payload;
            })
            .addCase(getUserShoppingCartLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProductLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductLoading.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addProductLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changeProductAmountLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeProductAmountLoading.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changeProductAmountLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeProductLoading.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProductLoading.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeProductLoading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { putProductInCart, changeProductAmountInCart, deleteProductFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectTotalPrice = (state) => {
    return state.cart.productsInCart.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
};

export const getUserShoppingCart = () => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth
    if (isAuth) {
        return await dispatch(getUserShoppingCartLoading());
    }
    return true;
};

export const addProduct = (product) => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth
    if (!isAuth) {
        return dispatch(putProductInCart(product));
    } else {
        return await dispatch(addProductLoading(product.productId));
    }
};

export const changeProductAmount = (params) => async (dispatch, getState) => {
    const { productId, quantity } = params;
    const isAuth = getState().auth.isAuth;

    if (!isAuth) {
        return dispatch(changeProductAmountInCart(productId));
    } else {
        const existingProduct = getState().cart.productsInCart.find(item => item.productId === productId);
        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                return await dispatch(changeProductAmountLoading({productId, quantity}));
            } else {
                return await dispatch(removeProductLoading(productId));
            }
        }
    }
};

export const removeProduct = (productId) => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth
    if (!isAuth) {
        return dispatch(deleteProductFromCart(productId));
    } else {
        return await dispatch(removeProductLoading(productId));
    }
};
