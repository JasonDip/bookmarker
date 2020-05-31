import * as bundleApi from "../api/bundle";

/* actions */
const GET_COLLECTIONS_PENDING = "bookmarker/bookmarker/GET_COLLECTIONS_PENDING";
const GET_COLLECTIONS_SUCCESS = "bookmarker/bookmarker/GET_COLLECTIONS_SUCCESS";
const GET_COLLECTIONS_FAIL = "bookmarker/bookmarker/GET_COLLECTIONS_FAIL";

/* reducer */
const initialState = {
    collections: [],
    selectedCollection: [],
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_COLLECTIONS_PENDING:
            return state;
        case GET_COLLECTIONS_SUCCESS:
            return {
                ...state,
                selectedCollection: action.payload,
            };
        case GET_COLLECTIONS_FAIL:
            console.log("GET_COLLECTIONS_FAIL");
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}

/* action creators */

/* thunks */
export const getCollections = (bundleId) => {
    return (dispatch) => {
        dispatch({ type: GET_COLLECTIONS_PENDING });
        bundleApi
            .getCollection("5ecadee8e7263f4734bd1a0d")
            .then((res) => {
                dispatch({
                    type: GET_COLLECTIONS_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_COLLECTIONS_FAIL,
                    payload: err,
                });
            });
    };
};
