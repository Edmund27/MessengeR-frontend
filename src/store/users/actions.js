export const SET_USERS = 'SET_USERS';
export const SET_ONLINE_USERS = 'SET_ONLINE_USERS';


export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}

export const setOnlineUsers = (onlineUsers) => {
    return {
        type: SET_ONLINE_USERS,
        payload: onlineUsers
    }
}
