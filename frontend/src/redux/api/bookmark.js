import Axios from "axios";

import getAxiosConfig from "./getAxiosConfig";

const url = process.env.REACT_APP_API_URL;

/* create a bookmark in a bundle */
export const createBookmark = (bundleId, bookmarkObj) => {
    Axios.post(
        url + "/bundles/" + bundleId + "/bookmarks",
        { ...bookmarkObj },
        getAxiosConfig()
    );
};

/* modify a bookmark */

/* move a bookmark between bundles */

/* delete a bookmark */
