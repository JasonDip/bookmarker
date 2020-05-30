import * as ACTIONS from "./actions";

const initialState = {
    collections: [],
    selectedCollection: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_COLLECTIONS_SUCCESS:
            return {
                ...state,
                selectedCollection: action.payload,
            };
        case ACTIONS.GET_COLLECTIONS_FAIL:
            console.log("GET_COLLECTIONS_FAIL");
            console.log(action.payload);
            return state;
        default:
            return state;
    }
};

export default reducer;
