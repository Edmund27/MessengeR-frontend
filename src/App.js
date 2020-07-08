import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, useHistory } from "react-router-dom";
import ChatScreen from "./pages/ChatScreen";
import Loginn from "./pages/Loginn";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { selectToken } from "./store/user/selectors";
import { selectEmail } from "./store/user/selectors";
import socket from './socket'
import Card from "react-bootstrap/Card";
import './styles/general.css';


import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
//import MessageBox from "./components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail)

  const history = useHistory();


  useEffect(() => {
    if (token == null) {
      history.push("/");
    }
  }, [token, history]);


  const loggedIn = !token ? null : <Navigation />

  const loggedOut = token ? null :
    <div className="logo">
      <img
        src="https://i.imgur.com/nQpDXxK.png"
        width="190" height="100">
      </img>
    </div>
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);


  useEffect(() => {
    dispatch(getUserWithStoredToken());

  }, [dispatch]);

  return (
    <div >
      <div className="header">
        {loggedIn}
        {loggedOut}
      </div>
      {/* <Navigation /> */}
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/chat-screen" component={ChatScreen} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />

      </Switch>
    </div>
  );
}

export default App;
