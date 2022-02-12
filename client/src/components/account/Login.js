import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Card from "../Card";
import AccountForm from "./AccountForm";

import { login } from "../../actions/auth";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function validate(field, label) {
    if (!field) {
      setStatus(`Error:  ${label} is required `);
      return false;
    }
    // validate email format
    if (
      label === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field)
    ) {
      const errorMessage = `Error: Email has an invalid format`;
      setStatus(errorMessage);
      return false;
    }
    return true;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    dispatch(login(email, password))
      .then(() => {
        props.history.push("/welcome");
        window.location.reload();
      })
      .catch(() => {
        setStatus(`Error:  There was an error trying to login. `);
      });

    if (isLoggedIn) {
      return <Redirect to="/welcome" />;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (status !== "") {
      //console.log(`Called useEffect Login`);
      setTimeout(() => {
        if (isMounted) setStatus("");
      }, 3000);
    }

    return () => (isMounted = false);
  }, [status]);

  const loginForm = (
    <AccountForm
      email={email}
      handleEmailChange={(e) => setEmail(e.currentTarget.value)}
      password={password}
      handlePasswordChange={(e) => setPassword(e.currentTarget.value)}
      handleSubmit={handleLogin}
      isDisabled={false}
      isNewAccount={false}
      label="Login"
    />
  );

  return (
    <>
      <Card
        header="Login"
        maxWidth="40rem"
        className="card brand-centered brand-margin-top"
        status={status}
        body={loginForm}
      />
    </>
  );
}

export default Login;