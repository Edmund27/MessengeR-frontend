export const APPEND_MESSAGE = 'APPEND_MESSAGE';
export const SET_USER = 'SET_USER';
export const SET_CLIENT_ID = 'SET_CLIENT_ID';


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}
