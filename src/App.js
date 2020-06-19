import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import ChatScreen from "./pages/ChatScreen";

function App() {
  return (
    <div >
      <Switch>
        <Route path="/chat-screen" component={ChatScreen} />
      </Switch>
    </div>
  );
}

export default App;
