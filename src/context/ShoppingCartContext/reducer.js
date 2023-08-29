import { actions } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.getProducts:
            return {
                ...state,
                productsLoader: true,
                productsError: null,
            };
        case actions.getProductsSuccess:
            return {
                ...state,
                products: action.payload,
                productsLoader: false,
            };
        case actions.getProductsError:
            return {
                ...state,
                productsLoader: false,
                productsError: action.payload,
            };
        case actions.filterProducts:
            return {
                ...state,
                productsFilter: action.payload,
            };
        case actions.searchProducts:
            return {
                ...state,
                searchBar: action.payload,
            };
        default:
            return state;
    }
}