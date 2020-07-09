import { CLEAR_CHAT, SET_CHATS, SET_PAST_MESSAGES, SET_SENDER_NAME, SET_NEW_MESSAGE } from "./actions";

const initialState = {
    messages: JSON.parse(localStorage.getItem("messages")),
    sender: JSON.parse(localStorage.getItem("sender"))
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS:
            //console.log(action.payload)
            return [
                ...action.payload
            ]
        case SET_PAST_MESSAGES:
            console.log('SET_PAST_MESSAGES', action.payload)
            localStorage.setItem("messages", JSON.stringify(action.payload));
            console.log("LOCAL STORAGE MESSAGES", localStorage.getItem('messages'))
            return {
                ...state,
                messages: action.payload
            }
        case SET_SENDER_NAME:
            console.log('SET_SENDER_NAME', action.payload)
            localStorage.setItem("sender", JSON.stringify(action.payload));
            console.log("LOCAL STORAGE SENDER", localStorage.getItem('sender'))
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
            localStorage.removeItem("messages");
            localStorage.removeItem("sender");
            console.log('CLEARING CHAT', action.payload)
            return action.payload
        default:
            return state;
    }
};
