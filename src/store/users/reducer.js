import { SET_USERS } from "./actions";

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            console.log(action.payload)
            return [
                ...action.payload
            ]
        default:
            return state;
    }
};
