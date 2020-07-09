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
//import './styles/general.css';
import MessageBox from "./components/MessageBox";
import Profile from "./pages/Profile";


import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
//import MessageBox from "./components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail)
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getUserWithStoredToken());

  }, [dispatch]);

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
  const isLoading = useSelector(selectAppLoading);



  return (
    <div >
      <div className="header">
        {loggedIn}
        {loggedOut}
      </div>
      <MessageBox />
      {/* <Navigation /> */}
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/chat-screen" component={ChatScreen} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />

      </Switch>
    </div>
  );
}

export default App;
