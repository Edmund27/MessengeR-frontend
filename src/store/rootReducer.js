import { combineReducers } from "redux";
import user from "./user/reducer";
import users from "./users/reducer";
import chats from "./chats/reducer";

export default combineReducers({
    user,
    users,
    chats
});
