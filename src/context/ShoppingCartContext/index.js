import React, { createContext, useReducer } from 'react';
import { initialState } from "./constants";
import { reducer } from "./reducer";

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return ( 
        <ShoppingCartContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ShoppingCartContext.Provider>
    );
}
 
export default ShoppingCartProvider;