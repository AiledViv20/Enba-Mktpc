import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import { enbaApi } from "./enbaapi";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counterState', enbaApi.reducerPath]
}

const rootReducer = combineReducers({
    counterState: counterReducer,
    [enbaApi.reducerPath]: enbaApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        immutableCheck: false,
    }).concat(thunk, enbaApi.middleware),
})
