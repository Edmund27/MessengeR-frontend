import { combineReducers } from "redux";
import user from "./user/reducer";
import chat from "./chat/reducer";
import appState from "./appState/reducer";

export default combineReducers({
    user,
    chat,
    appState
});
