export const APPEND_MESSAGE = 'APPEND_MESSAGE';
export const SET_USER = 'SET_USER';
export const SET_CLIENT_ID = 'SET_CLIENT_ID';



export const appendMessage = (data) => {
    return {
        type: APPEND_MESSAGE,
        payload: {
            ...data,
        },
    };
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const setClientId = (clientId) => {
    return {
        type: SET_CLIENT_ID,
        payload: clientId
    }
}
