import Axios from "axios";

const url = process.env.REACT_APP_API_URL;

/* log in */
export const login = (email, password) => {
    return fetch(url + "/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "myemail1@gmail.com",
            password: "mypass",
        }),
        credentials: "include",
    });
};
// export const login = (email, password) => {
//     return Axios.post(url + "/login", {
//         email: "myemail1@gmail.com",
//         password: "mypass",
//     });
// };
