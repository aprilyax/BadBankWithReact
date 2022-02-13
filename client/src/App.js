import "./css/styles.css";
import "./css/bootstrap.css";

import React, { useEffect } from "react";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/Home";
import CreateAccount from "./components/account/CreateAccount";
import Login from "./components/account/Login";
import Deposit from "./components/accountBalance/Deposit";
import Withdraw from "./components/accountBalance/Withdraw";
import AllData from "./components/allData/AllData";
import Welcome from "./components/account/Welcome";

import { Router, Route, Switch } from "react-router-dom";
import { clearMessage } from "./actions/message";
//import { history } from "./helpers/history";
import { useDispatch } from "react-redux";
import { logout } from "./actions/auth";
// used for log out if token is expired
import AuthVerify from "./common/AuthVerify";
const history = require("history").createBrowserHistory()

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <Router history={history}>
        <NavBar logOut={logOut} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/createaccount/" component={CreateAccount} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/welcome" component={Welcome} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/alldata/" component={AllData} />
        </Switch>
        <AuthVerify logOut={logOut} />
      </Router>
      
    </>
  );
}

export default App;