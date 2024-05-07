import {configureStore} from '@reduxjs/toolkit'
import movieOptionReducer from './movieOptionsSlice';
import authReducer from './authSlice';
import { apiSlice } from './apiSlice';
import { adminApi } from './adminApi';
import { movieApi } from './movieApi';
import { actorApi } from './actorApi';
import { chatApi } from './chatApi';

const store = configureStore({
    reducer: {
      [adminApi.reducerPath]: adminApi.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      [movieApi.reducerPath]: movieApi.reducer,
      [actorApi.reducerPath]: actorApi.reducer,
      [chatApi.reducerPath]: chatApi.reducer,
      movies: movieOptionReducer,
      auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
      apiSlice.middleware, 
      adminApi.middleware,
      movieApi.middleware,
      actorApi.middleware,
      chatApi.middleware,
    ),
    devTools: true,
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 