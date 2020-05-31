import * as authenticationApi from "../api/authentication";

/* actions */
const LOGIN_PENDING = "bookmarker/authentication/LOGIN_PENDING";
const LOGIN_SUCCESS = "bookmarker/authentication/LOGIN_SUCCESS";
const LOGIN_FAIL = "bookmarker/authentication/LOGIN_FAIL";

/* reducer */
const initialState = {
    id: null,
    name: null,
    email: null,
    token: null,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_PENDING:
            return state;
        case LOGIN_SUCCESS:
            return state;
        case LOGIN_FAIL:
            return state;
        default:
            return state;
    }
}

/* action creators */

/* thunks */
export const login = (email, password) => {
    return (dispatch) => {
        authenticationApi
            .login(email, password)
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
