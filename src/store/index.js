import { createStore, applyMiddleware, compose } from "redux";

import ReduxThunk from "redux-thunk";
import reducer from "./rootReducer";
import socket from '../socket'
import { setUser } from "./user/actions"
import { setUsers } from "./users/actions"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducer, enhancer);

socket.on("userCreated", repsonse => {
    const { user, users } = repsonse
    store.dispatch(setUser(user))
    //store.dispatch(setUsers(users))
})

socket.on("sendUsers", repsonse => {
    const users = repsonse
    store.dispatch(setUsers(users))
})


export default store;