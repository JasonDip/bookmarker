import * as authenticationDuck from "./authentication";
import * as selectedCollectionDuck from "./selectedCollection";
import * as bundleActions from "../actions/bundle";
import * as userActions from "../actions/user";
import * as bookmarkActions from "../actions/bookmark";

/* actions */
const LOADING_ON = "ducks/loading/LOADING_ON";
const LOADING_OFF = "ducks/loading/LOADING_OFF";

/* reducer */
const loading = false;
export default function reducer(state = loading, action) {
    switch (action.type) {
        case LOADING_ON:
        case authenticationDuck.LOGIN_PENDING:
        case authenticationDuck.LOGOUT_PENDING:
        case selectedCollectionDuck.GET_COLLECTION_PENDING:
        case bundleActions.CREATE_NEW_COLLECTION_PENDING:
        case bundleActions.CREATE_NESTED_BUNDLE_PENDING:
        case userActions.GET_USER_INFO_PENDING:
        case userActions.CREATE_NEW_USER_PENDING:
        case userActions.DELETE_USER_PENDING:
        case userActions.CHANGE_PASSWORD_PENDING:
        case bookmarkActions.CREATE_BOOKMARK_PENDING:
        case bookmarkActions.MODIFY_BOOKMARK_PENDING:
        case bookmarkActions.DELETE_BOOKMARK_PENDING:
            return true;

        case LOADING_OFF:
        case authenticationDuck.LOGIN_SUCCESS:
        case authenticationDuck.LOGIN_FAIL:
        case authenticationDuck.LOGOUT_SUCCESS:
        case authenticationDuck.LOGOUT_FAIL:
        case selectedCollectionDuck.GET_COLLECTION_SUCCESS:
        case selectedCollectionDuck.GET_COLLECTION_FAIL:
        case bundleActions.CREATE_NEW_COLLECTION_SUCCESS:
        case bundleActions.CREATE_NEW_COLLECTION_FAIL:
        case bundleActions.CREATE_NESTED_BUNDLE_SUCCESS:
        case bundleActions.CREATE_NESTED_BUNDLE_FAIL:
        case userActions.GET_USER_INFO_SUCCESS:
        case userActions.GET_USER_INFO_FAIL:
        case userActions.CREATE_NEW_USER_SUCCESS:
        case userActions.CREATE_NEW_USER_FAIL:
        case userActions.DELETE_USER_SUCCESS:
        case userActions.DELETE_USER_FAIL:
        case userActions.CHANGE_PASSWORD_SUCCESS:
        case userActions.CHANGE_PASSWORD_FAIL:
        case bookmarkActions.CREATE_BOOKMARK_SUCCESS:
        case bookmarkActions.CREATE_BOOKMARK_FAIL:
        case bookmarkActions.MODIFY_BOOKMARK_SUCCESS:
        case bookmarkActions.MODIFY_BOOKMARK_FAIL:
        case bookmarkActions.DELETE_BOOKMARK_SUCCESS:
        case bookmarkActions.DELETE_BOOKMARK_FAIL:
            return false;

        default:
            return state;
    }
}

/* action creators */
export const loadingOn = () => {
    return {
        type: LOADING_ON,
    };
};

export const loadingOff = () => {
    return {
        type: LOADING_OFF,
    };
};
