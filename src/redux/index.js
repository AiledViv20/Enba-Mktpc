import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from './slices/shoppingCartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['shoppingCartState']
}

const rootReducer = combineReducers({
    shoppingCartState: shoppingCartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storesp = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});