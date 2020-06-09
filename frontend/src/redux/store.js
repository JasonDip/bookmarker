import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import collectionListReducer from "./ducks/collectionList";
import selectedCollectionReducer from "./ducks/selectedCollection";
import optionsReducer from "./ducks/options";
import authenticationReducer from "./ducks/authentication";
import loadingReducer from "./ducks/loading";
import snackbarReducer from "./ducks/snackbar";

const reducer = combineReducers({
    collectionList: collectionListReducer,
    selectedCollection: selectedCollectionReducer,
    options: optionsReducer,
    authentication: authenticationReducer,
    loading: loadingReducer,
    snackbar: snackbarReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
