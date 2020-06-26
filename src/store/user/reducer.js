import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID, SET_USERNAME, SET_CLIENT_ID } from "./actions";

const initialState = {
    token: localStorage.getItem("token"),
    username: null,
    email: null,
    clientId: null,
    name: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return { ...state, ...action.payload };

        case LOG_OUT:
            localStorage.removeItem("token");
            return { ...initialState, token: null };

        case TOKEN_STILL_VALID:
            return { ...state, ...action.payload };

        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case SET_CLIENT_ID:
            return {
                ...state,
                clientId: action.payload
            }

        default:
            return state;
    }
};
