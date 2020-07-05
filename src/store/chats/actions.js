export const SET_CHATS = 'SET_CHATS';
export const SET_PAST_MESSAGES = 'SET_PAST_MESSAGES';
export const SET_SENDER_NAME = 'SET_SENDER_NAME';
export const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE';


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

export const setSenderName = (senderName) => {
    return {
        type: SET_SENDER_NAME,
        payload: senderName
    }
}

export const setNewMessage = (message) => {
    return {
        type: SET_NEW_MESSAGE,
        payload: message
    }
}


