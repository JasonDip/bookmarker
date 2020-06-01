import * as authenticationApi from "../api/authentication";
import * as bookmarkerDuck from "./bookmarker";

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
            // save token
            localStorage.setItem("token", action.payload.token);
            return {
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
            };
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return initialState;
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
                dispatch({ type: LOGIN_SUCCESS, payload: res.data });
                dispatch(
                    bookmarkerDuck.saveCollectionList(res.data.ownedCollections)
                );
            })
            .catch((err) => {
                dispatch({ type: LOGIN_FAIL, payload: err });
            });
    };
};
