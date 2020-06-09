import Axios from "axios";
import getAxiosConfig from "./getAxiosConfig";

const url = process.env.REACT_APP_API_URL;

/* create a new account */
export const createNewUser = (userObj) => {
    return Axios.post(url + "/user", userObj);
};

/* delete the current user's account */
export const deleteUser = (password) => {
    return Axios.delete(url + "/user", getAxiosConfig({ password }));
};

/* get user's id, name, email, and ownedCollections */
export const getUserInfo = () => {
    return Axios.get(url + "/user", getAxiosConfig());
};

/* change password */
