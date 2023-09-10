import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    kits: []
}

export const counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
        }
    }
})

export const { setProducts } = counterSlice.actions;
export const selectProducts = (state) => state.counterState.products;
export default counterSlice.reducer;