export const APPEND_MESSAGE = 'APPEND_MESSAGE';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_CLIENT_ID = 'SET_CLIENT_ID';



export const appendMessage = (data) => {
    return {
        type: APPEND_MESSAGE,
        payload: {
            ...data,
        },
    };
};

export const setUsername = (username) => {
    return {
        type: SET_USERNAME,
        payload: username
    }
}

export const setClientId = (clientId) => {
    return {
        type: SET_CLIENT_ID,
        payload: clientId
    }
}