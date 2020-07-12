import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
    appLoading,
    appDoneLoading,
    showMessageWithTimeout,
    setMessage
} from "../appState/actions";
import socket from '../../socket'
import { setLastMessages } from "../chats/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = userWithToken => {
    return {
        type: LOGIN_SUCCESS,
        payload: userWithToken
    };
};

const tokenStillValid = userWithoutToken => ({
    type: TOKEN_STILL_VALID,
    payload: userWithoutToken
});



export const logOut = () => {
    return ({ type: LOG_OUT })
}
//     async (dispatch, getState) => {
//         //const user = getState().user
//         const user = selectUser(getState());
//         //socket.emit("disconnect", user)
//         console.log("USER", user)
//     }
// )

// return (
//     {
//         type: LOG_OUT
//     }

export const signUp = (name, email, password, id) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(`${apiUrl}/signup`, {
                name,
                email,
                password,
                id
            });

            dispatch(loginSuccess(response.data));
            dispatch(showMessageWithTimeout("success", true, "account created"));
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                dispatch(setMessage("danger", true, error.response.data.message));
            } else {
                console.log(error.message);
                dispatch(setMessage("danger", true, error.message));
            }
            dispatch(appDoneLoading());
        }
    };
};

export const login = (email, password) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(`${apiUrl}/login`, {
                email,
                password
            });
            dispatch(loginSuccess(response.data));
            //console.log(response.data)
            dispatch(getChatsWithLastMessages(response.data.id, response.data.token))
            dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                dispatch(setMessage("danger", true, error.response.data.message));
            } else {
                console.log(error.message);
                dispatch(setMessage("danger", true, error.message));
            }
            dispatch(appDoneLoading());
        }
    };
};

export const getUserWithStoredToken = () => {
    return async (dispatch, getState) => {
        const token = selectToken(getState());

        if (token === null) {
            return;
        }


        dispatch(appLoading());
        try {
            const response = await axios.get(`${apiUrl}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(tokenStillValid(response.data));
            socket.emit('userLogin', response.data.email)
            dispatch(getChatsWithLastMessages(response.data.id, token))

            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.message);
            } else {
                console.log(error);
            }

            dispatch(logOut());
            dispatch(disconnectSocket())
            dispatch(appDoneLoading());
        }
    };
};

export const postPicture = (imageUrl, name) => async (dispatch, getState) => {
    try {
        dispatch(appLoading());
        const { token, id } = getState().user
        await axios.patch(`${apiUrl}/users/${id}`,
            { imageUrl, name },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        dispatch(showMessageWithTimeout(setMessage("Success", false, "SUCCESS")))
        dispatch(getUserWithStoredToken());
        dispatch(appDoneLoading());
    } catch (e) {
        console.log(e)
    }
}

export const disconnectSocket = () => {
    return async () => {
        socket.disconnect()
        //     const user = selectUser(getState());
        //     //socket.disconnect()
        //     console.log("SOCKET DISCONNECT", user)
        //     socket.emit('disconnect', user);
        // }
    }
}

export const getChatsWithLastMessages = (id, token) => {
    return async (dispatch, getState) => {

        //console.log("ID TOKEN", id, token)
        dispatch(appLoading());
        try {
            const response = await axios.get(`${apiUrl}/users/${id}/chats/messages/last`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            //console.log("RESPONSE", response)
            dispatch(setLastMessages(response.data))
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.message);
            } else {
                console.log(error);
            }
            dispatch(appDoneLoading());
        }
    };
};
