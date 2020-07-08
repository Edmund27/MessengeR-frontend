import { CLEAR_CHAT, SET_CHATS, SET_PAST_MESSAGES, SET_SENDER_NAME, SET_NEW_MESSAGE } from "./actions";

const initialState = {
    messages: [],
    sender: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS:
            //console.log(action.payload)
            return [
                ...action.payload
            ]
        case SET_PAST_MESSAGES:
            console.log('ACTION PAYLOAD', action.payload)
            return {
                ...state,
                messages: action.payload
            }
        case SET_SENDER_NAME:
            console.log('ACTION PAYLOAD', action.payload)
            return {
                ...state,
                sender: action.payload
            }

        case SET_NEW_MESSAGE:
            console.log('ACTION PAYLOAD', action.payload)
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case CLEAR_CHAT:
            console.log('CLEARING CHAT', action.payload)
            return action.payload
        default:
            return state;
    }
};
