import * as bundleApi from "../api/bundle";

/* actions */
// save single collection and its children bundles to selectedCollection
const GET_COLLECTION_PENDING = "bookmarker/bookmarker/GET_COLLECTIONS_PENDING";
const GET_COLLECTION_SUCCESS = "bookmarker/bookmarker/GET_COLLECTIONS_SUCCESS";
const GET_COLLECTION_FAIL = "bookmarker/bookmarker/GET_COLLECTIONS_FAIL";
// save the collection list to collections
const SAVE_COLLECTION_LIST = "bookmarker/bookmarker/SAVE_COLLECTION_LIST";

/* reducer */
const initialState = {
    collections: [],
    selectedCollection: [],
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_COLLECTION_PENDING:
            return state;
        case GET_COLLECTION_SUCCESS:
            return {
                ...state,
                selectedCollection: action.payload,
            };
        case GET_COLLECTION_FAIL:
            console.log("GET_COLLECTIONS_FAIL");
            console.log(action.payload);
            return state;
        case SAVE_COLLECTION_LIST:
            return { ...state, collections: action.payload };
        default:
            return state;
    }
}

/* action creators */
export const saveCollectionList = (collectionList) => {
    return {
        type: SAVE_COLLECTION_LIST,
        payload: collectionList,
    };
};

/* thunks */
export const getCollection = (bundleId) => {
    return (dispatch) => {
        dispatch({ type: GET_COLLECTION_PENDING });
        bundleApi
            .getCollection("5ecadee8e7263f4734bd1a0d")
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
