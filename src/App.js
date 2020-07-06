import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import ChatScreen from "./pages/ChatScreen";
import Loginn from "./pages/Loginn";
import Home from "./pages/Home";
import AddFriend from "./pages/AddFriend";

function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" component={Loginn} />
        <Route path="/chat-screen" component={ChatScreen} />
        <Route path="/home" component={Home} />
        <Route path="/add-friend" component={AddFriend} />

      </Switch>
    </div>
  );
}

export default App;
