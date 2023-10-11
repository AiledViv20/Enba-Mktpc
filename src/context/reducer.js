import { actions } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.artPerPageCards:
            return {
                ...state,
                artPerPage: action.payload,
            };
        case actions.orderCards:
            return {
                ...state,
                order: action.payload,
            };
        default:
            return state;
    }
}