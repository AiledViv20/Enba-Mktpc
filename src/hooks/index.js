import { configureStore } from "@reduxjs/toolkit";
import { enbaApi } from "./enbaapi";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
  } from 'redux-persist';

export const store = configureStore({
    reducer: {
      [enbaApi.reducerPath]: enbaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(enbaApi.middleware),
})
