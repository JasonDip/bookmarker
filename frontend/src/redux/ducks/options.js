/* actions */
// edit mode
const SET_EDIT_MODE_ON = "ducks/options/SET_EDIT_MODE_ON";
const SET_EDIT_MODE_OFF = "ducks/options/SET_EDIT_MODE_OFF";
// expand/collapse
const EXPAND_ALL = "ducks/options/EXPAND_ALL";
const COLLAPSE_ALL = "ducks/options/COLLAPSE_ALL";
const EXPAND_NORMAL = "ducks/options/EXPAND_NORMAL";
export const EXPAND_STATE = {
    EXPAND: "EXPAND",
    COLLAPSE: "COLLAPSE",
    NORMAL: "NORMAL",
};

/* reducer */
const initialState = {
    editMode: false,
    expandState: EXPAND_STATE.NORMAL,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_EDIT_MODE_OFF:
            return { ...state, editMode: false };
        case SET_EDIT_MODE_ON:
            return { ...state, editMode: true };
        case EXPAND_ALL:
            return {
                ...state,
                expandState: EXPAND_STATE.EXPAND,
            };
        case COLLAPSE_ALL:
            return {
                ...state,
                expandState: EXPAND_STATE.COLLAPSE,
            };
        case EXPAND_NORMAL:
            return {
                ...state,
                expandState: EXPAND_STATE.NORMAL,
            };
        default:
            return state;
    }
}

/* action creators */
export const setEditModeOn = () => {
    return { type: SET_EDIT_MODE_ON };
};

export const setEditModeOff = () => {
    return { type: SET_EDIT_MODE_OFF };
};

export const expandAll = () => {
    return { type: EXPAND_ALL };
};

export const collapseAll = () => {
    return { type: COLLAPSE_ALL };
};

export const expandNormal = () => {
    return { type: EXPAND_NORMAL };
};
