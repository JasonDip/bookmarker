import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import bookmarkerReducer from "./reducers/bookmarker/reducer";
import optionsReducer from "./reducers/options/reducer";

const reducer = combineReducers({
    bookmarker: bookmarkerReducer,
    options: optionsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
