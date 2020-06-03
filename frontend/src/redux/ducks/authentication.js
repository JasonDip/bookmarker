import * as authenticationApi from "../api/authentication";
import * as collectionListDuck from "./collectionList";
import * as userActions from "../actions/user";

/* actions */
export const LOGIN_PENDING = "ducks/authentication/LOGIN_PENDING";
export const LOGIN_SUCCESS = "ducks/authentication/LOGIN_SUCCESS";
export const LOGIN_FAIL = "ducks/authentication/LOGIN_FAIL";

/* reducer */
const initialState = {
    id: null,
    name: null,
    email: null,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case userActions.GET_USER_INFO_SUCCESS:
            return {
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
            };
        case LOGIN_FAIL:
        case userActions.GET_USER_INFO_FAIL:
            console.log(action.payload);
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
        dispatch({ type: LOGIN_PENDING });
        authenticationApi
            .login(email, password)
            .then((res) => {
                // save token
                localStorage.setItem("token", res.data.token);
                // save user data to redux store
                dispatch({ type: LOGIN_SUCCESS, payload: res.data });
                // save collectionList to redux store
                dispatch(
                    collectionListDuck.saveCollectionList(
                        res.data.ownedCollections
                    )
                );
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.response.data.error,
                });
            });
    };
};
