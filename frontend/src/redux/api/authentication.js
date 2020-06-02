import Axios from "axios";

import getAxiosConfig from "./getAxiosConfig";

const url = process.env.REACT_APP_API_URL;

/* log in */
export const login = (email, password) => {
    return Axios.post(
        url + "/login",
        {
            email: "myemail1@gmail.com",
            password: "mypass",
        },
        getAxiosConfig()
    );
};
