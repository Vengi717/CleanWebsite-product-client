// reducer.js

import { initialState } from "./initialState";
import { UPDATE_DATA, GET_DATA,DELETE_DATA } from "./actions";

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
            };
        case GET_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
            };
        case DELETE_DATA:
            const { [action.payload]: deletedItem, ...restData } = state.data;
            return {
                ...state,
                data: {
                    ...restData,
                },
            };
        default:
            return state;
    }
};
