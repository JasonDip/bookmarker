import Axios from "axios";

import getAxiosConfig from "./getAxiosConfig";

const url = process.env.REACT_APP_API_URL;

/* create a bookmark in a bundle */
export const createBookmark = (bundleId, bookmarkObj) => {
    return Axios.post(
        url + "/bundles/" + bundleId + "/bookmarks",
        bookmarkObj,
        getAxiosConfig()
    );
};

/* modify a bookmark */
export const modifyBookmark = (bundleId, bookmarkId, bookmarkObj) => {
    return Axios.patch(
        url + "/bundles/" + bundleId + "/bookmarks/" + bookmarkId,
        bookmarkObj,
        getAxiosConfig()
    );
};

/* move a bookmark between bundles */

/* delete a bookmark */
