import * as ACTIONS from "./actions";

const initialState = {
    collections: [],
    selectedCollection: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_COLLECTIONS:
            return {
                ...state,
                selectedCollection: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
