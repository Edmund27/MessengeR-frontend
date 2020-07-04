export const SET_CHATS = 'SET_CHATS';
export const SET_PAST_MESSAGES = 'SET_PAST_MESSAGES';


export const setChats = (chats) => {
    return {
        type: SET_CHATS,
        payload: chats
    }
}

export const setPastMessages = (messages) => {
    return {
        type: SET_PAST_MESSAGES,
        payload: messages
    }
}

