import Axios from "axios";
import getAxiosConfig from "./getAxiosConfig";

const url = process.env.REACT_APP_API_URL;

/* create a new account */
export const createNewUser = (userObj) => {
    return Axios.post(url + "/user", userObj, getAxiosConfig());
};

/* delete the current user's account */

/* get user's id, name, email, and ownedCollections */
export const getUserInfo = () => {
    return Axios.get(url + "/user", getAxiosConfig());
};

/* change password */
