// save the collection list to collections
const SAVE_COLLECTION_LIST = "ducks/collectionList/SAVE_COLLECTION_LIST";

/* reducer */
const defaultCollectionList = [];
export default function reducer(state = defaultCollectionList, action) {
    switch (action.type) {
        case SAVE_COLLECTION_LIST:
            return action.payload;
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
