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
        case actions.getKits:
            return {
                ...state,
                kitsLoader: true,
                kitsError: null,
            };
        case actions.getKitsSuccess:
            return {
                ...state,
                kits: action.payload,
                kitsLoader: false,
            };
        case actions.getKitsError:
            return {
                ...state,
                kitsLoader: false,
                kitsError: action.payload,
            };
        default:
            return state;
    }
}