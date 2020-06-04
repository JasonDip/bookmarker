import * as userActions from "../actions/user";

/* actions */
// save the collection list to collections
const SAVE_COLLECTION_LIST = "ducks/collectionList/SAVE_COLLECTION_LIST";

/* reducer */
const defaultCollectionList = [];
export default function reducer(state = defaultCollectionList, action) {
    switch (action.type) {
        case SAVE_COLLECTION_LIST:
            // used after authentication
            return action.payload;
        case userActions.GET_USER_INFO_SUCCESS:
            // used when refreshing user info
            return action.payload.ownedCollections;
        default:
            return state;
    }
}

/* action creators */
export const saveCollectionList = (collectionList) => {
    return {
        type: SAVE_COLLECTION_LIST,
        payload: collectionList,
    };
};
