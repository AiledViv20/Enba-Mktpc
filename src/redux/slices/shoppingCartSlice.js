import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const shoppingCartSlice = createSlice({
    name: "shoppingCartSlice",
    initialState,
    reducers: {
        setShoppingCart: (state, action) => {
            state.products = action.payload.products;
        }
    }
});

export const { setShoppingCart } = shoppingCartSlice.actions;
export const selectShoppingCart = (state) => state.shoppingCartState.products;
export default shoppingCartSlice.reducer;