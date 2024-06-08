// actions.js

// Define your action types
export const UPDATE_DATA = "UPDATE_DATA";
export const GET_DATA = "GET_DATA";
// Define a new action type for deleting an object
export const DELETE_DATA = "DELETE_DATA";

export function set(type, data) {
    return { type: UPDATE_DATA, payload: { [type]: data } };
}

export function getData(state) {
    return { type: GET_DATA, payload: state };
}



export function deleteData(type) {
    return { type: DELETE_DATA, payload: type };
  }

