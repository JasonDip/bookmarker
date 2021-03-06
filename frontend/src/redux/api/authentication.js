import Axios from "axios";

import getAxiosConfig from "./getAxiosConfig";

const url = process.env.REACT_APP_API_URL;

/* log in */
export const login = (email, password) => {
    return Axios.post(
        url + "/login",
        {
            email: email,
            password: password,
        },
        getAxiosConfig()
    );
};

/* log out */
export const logout = () => {
    return Axios.post(url + "/logout", null, getAxiosConfig());
};
