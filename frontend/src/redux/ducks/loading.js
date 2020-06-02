import * as authenticationDuck from "./authentication";
import * as selectedCollectionDuck from "./selectedCollection";
import * as bundleActions from "../actions/bundle";
import * as userActions from "../actions/user";

/* actions */
const LOADING_ON = "ducks/loading/LOADING_ON";
const LOADING_OFF = "ducks/loading/LOADING_OFF";

/* reducer */
const loading = false;
export default function reducer(state = loading, action) {
    switch (action.type) {
        case LOADING_ON:
        case authenticationDuck.LOGIN_PENDING:
        case selectedCollectionDuck.GET_COLLECTION_PENDING:
        case bundleActions.CREATE_NEW_COLLECTION_PENDING:
        case userActions.GET_USER_INFO_PENDING:
            return true;

        case LOADING_OFF:
        case authenticationDuck.LOGIN_SUCCESS:
        case authenticationDuck.LOGIN_FAIL:
        case selectedCollectionDuck.GET_COLLECTION_SUCCESS:
        case selectedCollectionDuck.GET_COLLECTION_FAIL:
        case bundleActions.CREATE_NEW_COLLECTION_SUCCESS:
        case bundleActions.CREATE_NEW_COLLECTION_FAIL:
        case userActions.GET_USER_INFO_SUCCESS:
        case userActions.GET_USER_INFO_FAIL:
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