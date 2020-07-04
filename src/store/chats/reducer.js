import { SET_CHATS, SET_PAST_MESSAGES } from "./actions";

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS:
            //console.log(action.payload)
            return [
                ...action.payload
            ]
        case SET_PAST_MESSAGES:
            console.log('ACTION PAYLOAD', action.payload)
            return [
                ...action.payload
            ]
        default:
            return state;
    }
};
