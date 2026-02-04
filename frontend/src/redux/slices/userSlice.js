import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// Login user
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', userData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Register user
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/register', userData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/auth/logout');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Get user profile
export const getUserProfile = createAsyncThunk(
    'user/profile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/me');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Register
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Logout
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        });

        // Get Profile
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        });
        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        });
    }
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;