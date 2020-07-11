import { SET_USERS, SET_ONLINE_USERS } from "./actions";

const initialState = {
    users: [],
    onlineUsers: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.payload]
            }
        case SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.payload
            }
        default:
            return state;
    }
};
