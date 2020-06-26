import { APPEND_MESSAGE, SET_USERNAME, SET_CLIENT_ID } from "./actions";

const initialState = {
    messages: [{ username: 'edmund', message: 'hey', clientId: 5 }],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APPEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]

            }
        default:
            return state;
    }
};
