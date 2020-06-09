import * as authenticationApi from "../api/authentication";
import * as collectionListDuck from "./collectionList";
import * as userActions from "../actions/user";
import * as selectedCollectionDuck from "./selectedCollection";

/* actions */
// login
export const LOGIN_PENDING = "ducks/authentication/LOGIN_PENDING";
export const LOGIN_SUCCESS = "ducks/authentication/LOGIN_SUCCESS";
export const LOGIN_FAIL = "ducks/authentication/LOGIN_FAIL";
// logout
export const LOGOUT_PENDING = "ducks/authentication/LOGOUT_PENDING";
export const LOGOUT_SUCCESS = "ducks/authentication/LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "ducks/authentication/LOGOUT_FAIL";

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
        case LOGOUT_SUCCESS:
        case LOGOUT_FAIL:
        case userActions.GET_USER_INFO_FAIL:
        case userActions.DELETE_USER_SUCCESS:
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
        dispatch(selectedCollectionDuck.clearSelectedCollection());
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
                    payload: err,
                });
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_PENDING });
        dispatch(selectedCollectionDuck.clearSelectedCollection());
        authenticationApi
            .logout()
            .then((res) => {
                // delete jwt and clear redux store
                dispatch({ type: LOGOUT_SUCCESS });
            })
            .catch((err) => {
                // should still clear on client side
                dispatch({ type: LOGOUT_FAIL });
            });
    };
};
