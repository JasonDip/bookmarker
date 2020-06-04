import * as bundleApi from "../api/bundle";

/* actions */
// save single collection and its children bundles to selectedCollection
export const GET_COLLECTION_PENDING =
    "ducks/selectedCollection/GET_COLLECTION_PENDING";
export const GET_COLLECTION_SUCCESS =
    "ducks/selectedCollection/GET_COLLECTION_SUCCESS";
export const GET_COLLECTION_FAIL =
    "ducks/selectedCollection/GET_COLLECTION_FAIL";

/* reducer */
const defaultSelectedCollection = [];
export default function reducer(state = defaultSelectedCollection, action) {
    switch (action.type) {
        case GET_COLLECTION_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

/* action creators */

/* thunks */
export const getCollection = (bundleId) => {
    return (dispatch) => {
        dispatch({ type: GET_COLLECTION_PENDING });
        bundleApi
            .getCollection(bundleId)
            .then((res) => {
                dispatch({
                    type: GET_COLLECTION_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_COLLECTION_FAIL,
                    payload: err,
                });
            });
    };
};
