import * as ACTIONS from "./actions";

const initialState = {
    editMode: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_EDIT_MODE_OFF:
            return { ...state, editMode: false };
        case ACTIONS.SET_EDIT_MODE_ON:
            return { ...state, editMode: true };
        default:
            return state;
    }
};

export default reducer;
