import { APPEND_MESSAGE, SET_USER, SET_CLIENT_ID } from "./actions";

const initialState = {
    messages: [],
    user: null,
    clientId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            console.log(action.payload)
            return {
                ...state,
                user: action.payload.name
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
