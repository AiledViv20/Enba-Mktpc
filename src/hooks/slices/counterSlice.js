import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    kits: [],
    kitsList: [],
    totalAmount: 0,
}

export const counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
        },
        setKits: (state, action) => {
            state.kits = action.payload.kits;
        },
        setKitsList: (state, action) => {
            state.kitsList = action.payload.kitsList;
        },
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload.totalAmount;
        },
    }
})

export const { setProducts } = counterSlice.actions;
export const selectProducts = (state) => state.counterState.products;
export const { setKits } = counterSlice.actions;
export const selectKits = (state) => state.counterState.kits;
export const { setKitsList } = counterSlice.actions;
export const selectKitsList = (state) => state.counterState.kitsList;
export const { setTotalAmount } = counterSlice.actions;
export const selectTotalAmount = (state) => state.counterState.totalAmount;
export default counterSlice.reducer;