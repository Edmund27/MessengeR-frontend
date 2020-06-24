import { APPEND_MESSAGE, SET_USERNAME, SET_CLIENT_ID } from "./actions";

const initialState = {
    messages: [{ username: 'edmund', message: 'hey', clientId: 5 }],
    username: null,
    clientId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case APPEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]

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
