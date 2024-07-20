import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productsInCart: [] // {id: 1, image: "img", name: "name", price: "price", quantity: 2}
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        putProductInCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.productsInCart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.productsInCart.push({ ...product, quantity: 1 });
            }
        },
        removeProductFromCart: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.productsInCart.find(item => item.id === productId);

            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    state.productsInCart = state.productsInCart.filter(item => item.id !== productId);
                }
            }
        },
        deleteProductFromCart: (state, action) => {
            const productId = action.payload;
            state.productsInCart = state.productsInCart.filter(item => item.id !== productId);
        }
    }
});

export const { putProductInCart, removeProductFromCart, deleteProductFromCart } = cartSlice.actions;

export const selectTotalPrice = (state) => {
    return state.cart.productsInCart.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
};

export default cartSlice.reducer;
