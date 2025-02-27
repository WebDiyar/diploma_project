import { configureStore, Store } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

const store: Store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;
