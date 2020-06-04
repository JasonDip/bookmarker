import * as bundleActions from "../actions/bundle";
import * as userActions from "../actions/user";
import * as authenticationDuck from "./authentication";
import * as selectedCollectionDuck from "./selectedCollection";

/* actions */
const ERROR_ON = "ducks/error/ERROR_ON";
const ERROR_OFF = "ducks/error/ERROR_OFF";

/* reducer */
const errorState = false;
export default function reducer(state = errorState, action) {
    switch (action.type) {
        case ERROR_ON:
        case bundleActions.CREATE_NEW_COLLECTION_FAIL:
        case bundleActions.MODIFY_BUNDLE_FAIL:
        case bundleActions.CREATE_NESTED_BUNDLE_FAIL:
        case userActions.GET_USER_INFO_FAIL:
        case authenticationDuck.LOGIN_FAIL:
        case authenticationDuck.LOGOUT_FAIL:
        case selectedCollectionDuck.GET_COLLECTION_FAIL:
            console.log(action.payload.response);
            console.log(
                `Error ${action.payload.response.status}: ${action.payload.response.statusText}`
            );
            return true;

        case ERROR_OFF:
        default:
            return false;
    }
}
