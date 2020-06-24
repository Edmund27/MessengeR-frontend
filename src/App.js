import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import ChatScreen from "./pages/ChatScreen";
import Login from "./pages/Login";

function App() {
  return (
    <div >
      <Switch>
        <Route path="/chat-screen" component={ChatScreen} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
