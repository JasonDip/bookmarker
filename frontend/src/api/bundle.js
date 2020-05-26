import Axios from "axios";

const url = process.env.REACT_APP_API_URL;

/* get a collection */
export const getCollection = (bundleId) => {
    return Axios.get(url + "bundles/" + bundleId);
};
