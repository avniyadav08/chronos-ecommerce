import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (params = {}, { rejectWithValue }) => {
        try {
            let url = '/products?';
            if (params.keyword) url += `keyword=${params.keyword}&`;
            if (params.category) url += `category=${params.category}&`;
            if (params.page) url += `page=${params.page}&`;
            
            const { data } = await API.get(url);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getProductDetails = createAsyncThunk(
    'products/getDetails',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/product/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: null,
        loading: false,
        error: null,
        productsCount: 0,
        resultPerPage: 8,
        filteredProductsCount: 0
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productsCount = action.payload.productsCount;
                state.resultPerPage = action.payload.resultPerPage;
                state.filteredProductsCount = action.payload.filteredProductsCount;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;