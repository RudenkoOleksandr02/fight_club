import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shoppingCartApi } from '../../api/shoppingCartApi';

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

const addProductOptimistic = createAsyncThunk(
    'cart/addProductOptimistic',
    async (productId, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await shoppingCartApi.addProduct(productId);
            return response;
        } catch (error) {
            const productsInCart = getState().cart.productsInCart;
            const existingProduct = productsInCart.find(item => item.productId === productId);
            if (existingProduct) {
                dispatch(changeProductAmountInCart({ productId, quantity: existingProduct.quantity - 1 }));
            } else {
                dispatch(deleteProductFromCart(productId));
            }
            return rejectWithValue(error.response.data);
        }
    }
);

const changeProductAmountOptimistic = createAsyncThunk(
    'cart/changeProductAmountOptimistic',
    async (params, { dispatch, rejectWithValue }) => {
        try {
            const { productId, quantity } = params;
            const response = await shoppingCartApi.changeProductAmount(params);
            return response;
        } catch (error) {
            const { productId, originalQuantity } = params;
            dispatch(changeProductAmountInCart({ productId, quantity: originalQuantity }));
            return rejectWithValue(error.response.data);
        }
    }
);

const removeProductOptimistic = createAsyncThunk(
    'cart/removeProductOptimistic',
    async (productId, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await shoppingCartApi.removeProduct(productId);
            return response;
        } catch (error) {
            const productsInCart = getState().cart.productsInCart;
            const originalProduct = productsInCart.find(item => item.productId === productId);
            if (originalProduct) {
                dispatch(putProductInCart({ ...originalProduct, quantity: originalProduct.quantity }));
            }
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    productsInCart: [],
    loading: true,
    error: null
};

const cartPageSlice = createSlice({
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
            const product = action.payload;
            const existingProduct = state.productsInCart.find(item => item.productId === product.productId);

            if (existingProduct) {
                if (existingProduct.quantity >= 1 && product.quantity !== 0) {
                    existingProduct.quantity = product.quantity;
                } else {
                    state.productsInCart = state.productsInCart.filter(item => item.productId !== product.productId);
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
            .addCase(addProductOptimistic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductOptimistic.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addProductOptimistic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changeProductAmountOptimistic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeProductAmountOptimistic.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changeProductAmountOptimistic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeProductOptimistic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProductOptimistic.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeProductOptimistic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { putProductInCart, changeProductAmountInCart, deleteProductFromCart, clearCart } = cartPageSlice.actions;

export default cartPageSlice.reducer;

export const selectTotalPrice = (state) =>
    state.cartPage.productsInCart.reduce((total, product) => {
        const discountedPrice = product.price * (1 - product.discount / 100);
        return total + (discountedPrice * product.quantity);
    }, 0);

export const getUserShoppingCart = () => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth;
    if (isAuth) {
        return await dispatch(getUserShoppingCartLoading());
    }
    return true;
};

export const addProduct = (product) => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth;
    if (!isAuth) {
        return dispatch(putProductInCart(product));
    } else {
        dispatch(putProductInCart(product));
        return await dispatch(addProductOptimistic(product.productId));
    }
};

export const changeProductAmount = (params) => async (dispatch, getState) => {
    const { productId, quantity } = params;
    const isAuth = getState().auth.isAuth;

    if (!isAuth) {
        return dispatch(changeProductAmountInCart({ productId, quantity }));
    } else {
        const existingProduct = getState().cartPage.productsInCart.find(item => item.productId === productId);
        if (existingProduct) {
            if (existingProduct.quantity >= 1) {
                dispatch(changeProductAmountInCart({ productId, quantity }));
                await dispatch(changeProductAmountOptimistic({ productId, quantity, originalQuantity: existingProduct.quantity }));
            } else {
                dispatch(deleteProductFromCart(productId));
                await dispatch(removeProductOptimistic(productId));
            }
        }
    }
};

export const removeProduct = (productId) => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth;
    if (!isAuth) {
        return dispatch(deleteProductFromCart(productId));
    } else {
        dispatch(deleteProductFromCart(productId));
        return await dispatch(removeProductOptimistic(productId));
    }
};
