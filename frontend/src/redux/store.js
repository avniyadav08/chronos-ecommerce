import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';
import productReducer from './slices/productslice.js';
import cartReducer from './slices/cartSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart: cartReducer
    }
});

export default store;