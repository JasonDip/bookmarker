import * as bookmarkApi from "../api/bookmark";
import * as selectedCollectionDuck from "../ducks/selectedCollection";

/* actions */
// create a bookmark
export const CREATE_BOOKMARK_PENDING =
    "actions/bookmark/CREATE_BOOKMARK_PENDING";
export const CREATE_BOOKMARK_SUCCESS =
    "actions/bookmark/CREATE_BOOKMARK_SUCCESS";
export const CREATE_BOOKMARK_FAIL = "actions/bookmark/CREATE_BOOKMARK_FAIL";

/* thunks */
export const createBookmark = (bundleId, bookmarkObj) => {
    return (dispatch) => {
        dispatch({ type: CREATE_BOOKMARK_PENDING });
        bookmarkApi
            .createBookmark(bundleId, bookmarkObj)
            .then((res) => {
                dispatch({ type: CREATE_BOOKMARK_SUCCESS });
                // refresh selectedCollection
                dispatch(
                    selectedCollectionDuck.getCollection(
                        res.data.topCollectionId
                    )
                );
            })
            .catch((err) => {
                dispatch({ type: CREATE_BOOKMARK_FAIL, payload: err });
            });
    };
};
