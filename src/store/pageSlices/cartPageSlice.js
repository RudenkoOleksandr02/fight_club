import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {shoppingCartApi} from '../../api/shoppingCartApi';
import productAPI from "../../api/productApi";
import {handleFulfilled, handlePending, handleRejected, initialObject} from "../../common/utils/forSlice";

const initialState = {
    productsInCart: [],
    loading: true,
    error: null,
    productsTotalAmount: initialObject,
};

const getUserShoppingCartLoading = createAsyncThunk(
    'cart/getUserShoppingCartLoading',
    async (_, {rejectWithValue}) => {
        try {
            return await shoppingCartApi.getUserShoppingCart()
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const addProductToCartLoading = createAsyncThunk(
    'cart/addProductToCartLoading',
    async (productId, {rejectWithValue}) => {
        try {
            return await shoppingCartApi.addProduct(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const removeProductInCartLoading = createAsyncThunk(
    'cart/removeProductInCartLoading',
    async (params, {rejectWithValue}) => {
        try {
            return await shoppingCartApi.changeProductAmount(params);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const deleteProductInCartLoading = createAsyncThunk(
    'cart/deleteProductInCartLoading',
    async (productId, {rejectWithValue}) => {
        try {
            return await shoppingCartApi.removeProduct(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const getProductByIdLoading = createAsyncThunk(
    'cart/getProductByIdLoading',
    async (productId, {rejectWithValue}) => {
        try {
            return await productAPI.getProductById(productId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cartPageSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        localAddProductToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.productsInCart.find(item => item.productId === product.productId);
            if (existingProduct) {
                state.productsInCart = state.productsInCart.map(item =>
                    item.productId === product.productId ? {...item, quantity: item.quantity + 1} : item);
            } else {
                state.productsInCart = [...state.productsInCart, {...product, quantity: 1}];
            }
        },
        localRemoveProductInCart: (state, action) => {
            const {productId, quantity} = action.payload;
            state.productsInCart = state.productsInCart.map(item =>
                item.productId === productId ? {...item, quantity} : item
            );
        },
        localChangeProductAmountInCart: (state, action) => {
            const {productId, quantity} = action.payload;
            state.productsInCart = state.productsInCart.map(item =>
                item.productId === productId ? {...item, quantity} : item
            );
        },
        localDeleteProductInCart: (state, action) => {
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
            .addCase(getProductByIdLoading.pending, (state) => (
                handlePending(state, 'productsTotalAmount'))
            )
            .addCase(getProductByIdLoading.fulfilled, (state, action) => {
                state.productsTotalAmount.loading = false;
                state.productsTotalAmount.data = [
                    ...state.productsTotalAmount.data,
                    {id: action.payload.id, totalAmount: action.payload.amount}
                ]
            })
            .addCase(getProductByIdLoading.rejected, (state, action) => (
                handleRejected(state, action, 'productsTotalAmount'))
            )
    }
});

export const {
    localAddProductToCart,
    localRemoveProductInCart,
    localChangeProductAmountInCart,
    localDeleteProductInCart,
    clearCart
} = cartPageSlice.actions;
export default cartPageSlice.reducer;

export const getUserShoppingCart = () => (dispatch, getState) => {
    const isAuth = getState().auth.isAuth;
    if (isAuth) {
        return dispatch(getUserShoppingCartLoading());
    }
};

export const addProductToCart = (product) => (dispatch, getState) => {
    const isAuth = getState().auth.isAuth;
    if (isAuth) {
        dispatch(localAddProductToCart(product));
        return dispatch(addProductToCartLoading(product.productId));
    } else {
        return dispatch(localAddProductToCart(product));
    }
};

export const removeProductInCart = (params) => (dispatch, getState) => {
    const {productId, quantity} = params;
    const isAuth = getState().auth.isAuth;
    const existingProduct = getState().cartPage.productsInCart.find(item => item.productId === productId);
    if (isAuth) {
        if (existingProduct.quantity > 1) {
            dispatch(localRemoveProductInCart({productId, quantity: quantity - 1}));
            return dispatch(removeProductInCartLoading({productId, quantity: quantity - 1}));

        } else {
            dispatch(localDeleteProductInCart(productId));
            return dispatch(deleteProductInCartLoading(productId));
        }
    } else {
        if (existingProduct.quantity > 1) {
            return dispatch(localRemoveProductInCart({productId, quantity: quantity - 1}));

        } else {
            return dispatch(localDeleteProductInCart(productId));
        }
    }
};

export const changeProductAmountInCart = (params) => (dispatch, getState) => {
    const {productId, quantity} = params;
    const isAuth = getState().auth.isAuth;
    const existingProduct = getState().cartPage.productsInCart.find(item => item.productId === productId);
    if (isAuth) {
        if (existingProduct.quantity >= 1) {
            dispatch(localChangeProductAmountInCart({productId, quantity}));
            return dispatch(removeProductInCartLoading({productId, quantity}));
        }
    } else {
        if (existingProduct.quantity >= 1) {
            return dispatch(localChangeProductAmountInCart({productId, quantity}));
        }
    }
};

export const deleteProductInCart = (productId) => (dispatch, getState) => {
    const isAuth = getState().auth.isAuth;
    if (isAuth) {
        dispatch(localDeleteProductInCart(productId));
        return dispatch(deleteProductInCartLoading(productId));
    } else {
        return dispatch(localDeleteProductInCart(productId))
    }
};

export const getTotalAmountProducts = (productId) => (dispatch) => {
    return dispatch(getProductByIdLoading(productId))
}

export const selectTotalPrice = (state) =>
    state.cartPage.productsInCart.reduce((total, product) => {
        const discountedPrice = product.price * (1 - product.discount / 100);
        return total + (discountedPrice * product.quantity);
    }, 0);
