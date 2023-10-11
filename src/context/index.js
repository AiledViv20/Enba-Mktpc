import React, { createContext, useReducer } from 'react';
import { initialState } from "./constants";
import { reducer } from "./reducer";

export const CardFilterContext = createContext();

const CardFilterProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return ( 
        <CardFilterContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CardFilterContext.Provider>
    );
}
 
export default CardFilterProvider;