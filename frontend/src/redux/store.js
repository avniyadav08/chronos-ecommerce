import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';  // Add .js extension

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;