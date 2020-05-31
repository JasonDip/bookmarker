/*  actions  */
export const SET_EDIT_MODE_ON = "SET_EDIT_MODE_ON";
export const SET_EDIT_MODE_OFF = "SET_EDIT_MODE_OFF";

/*  reducer  */
const initialState = {
    editMode: false,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_EDIT_MODE_OFF:
            return { ...state, editMode: false };
        case SET_EDIT_MODE_ON:
            return { ...state, editMode: true };
        default:
            return state;
    }
}

/*  action creators  */
export const setEditModeOn = () => {
    return { type: SET_EDIT_MODE_ON };
};

export const setEditModeOff = () => {
    return { type: SET_EDIT_MODE_OFF };
};
