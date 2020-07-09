import { createStore, applyMiddleware, compose } from "redux";

import ReduxThunk from "redux-thunk";
import reducer from "./rootReducer";
import socket from '../socket'
import { setUser } from "./user/actions"
import { setUsers } from "./users/actions"
import { setPastMessages, setChats, setNewMessage } from "./chats/actions"
import { selectSender } from "./chats/selectors"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducer, enhancer);

socket.on("userCreated", response => {
    console.log("RESPONSE:", response)
    const { user, users } = response
    //store.dispatch(setUser(user))
    store.dispatch(setUsers(users))
    //store.dispatch(setUsers(users))
})

socket.on("usersData", response => {
    console.log("RESPONSE:", response)
    store.dispatch(setUsers(response))
})

// socket.on("sendUsers", response => {
//     const users = response
// })

socket.on("chatsFound", response => {
    const chats = response
    store.dispatch(setChats(chats))
    //store.dispatch(setUsers(users))
})

socket.on("pastMessages", response => {
    store.dispatch(setPastMessages(response))
    //store.dispatch(setUsers(users))
})

socket.on("incomingMessage", response => {
    const openedChatSenderId = store.getState().chats.sender.id;
    const userId = store.getState().user.id;
    const emittedMessageSenderId = response.senderId
    console.log("HHHAHAHAHAAHAHHA", openedChatSenderId, emittedMessageSenderId, userId)
    if (openedChatSenderId === emittedMessageSenderId || userId === emittedMessageSenderId) {
        store.dispatch(setNewMessage(response))
    } else {
        return
    }
    //store.dispatch(setUsers(users))
})



export default store;