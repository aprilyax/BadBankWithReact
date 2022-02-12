import React, { useEffect, useState } from "react";
import Card from "../Card";
import AccountForm from "./AccountForm";


import AuthService from "../../services/auth.service";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  function validate(field, label) {
    let errorMessage = "";
    if (!field) {
      errorMessage = `Error:  ${label} is required`;
      setStatus(errorMessage);
      return false;
    }
    // validate email format
    if (
      label === "Email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field)
    ) {
      errorMessage = `Error: Email has an invalid format`;
      setStatus(errorMessage);
      return false;
    }
    // validate password
    if (label === "Password" && field.length < 8) {
      errorMessage = `Error: Password should have at least 8 characters`;
      setStatus(errorMessage);
      return false;
    }
    //console.log(`field: ${field}`);
    //console.log(`label: ${label}`);
    setStatus("");
    return true;
  }

  useEffect(() => {
    let isMounted = true;
    if (status !== "") {
      //console.log(`Called useEffect Create Account`);
      setTimeout(() => {
        if (isMounted) setStatus("");
      }, 3000);
    }

    return () => (isMounted = false);
  }, [status]);

  function handleCreate() {
    //console.log(firstName, email, password);
    if (!validate(firstName, "First Name")) return;
    if (!validate(lastName, "Last Name")) return;
    if (!validate(email, "Email")) return;
    if (!validate(password, "Password")) return;
    if (!validate(dob, "Date of Birth")) return;
    console.log(firstName, lastName, dob, email, password);
    AuthService.register(firstName, lastName, dob, email, password).then(
      (response) => {
        console.log("success" + response.data.message);
        setShow(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log("error: " + resMessage);
        setStatus(resMessage);
      }
    );
  }

  function clearForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDOB("");
    setPassword("");
    setShow(true);
    setIsDisabled(true);
  }

  function handleFirstNameChange(e) {
    if (isDisabled) {
      setIsDisabled(false);
    }
    setFirstName(e.currentTarget.value);
    //console.log("N: " + e.currentTarget.value);
    if (
      e.currentTarget.value === "" &&
      lastName === "" &&
      email === "" &&
      password === ""
    )
      setIsDisabled(true);
  }

  function handleLastNameChange(e) {
    if (isDisabled) {
      setIsDisabled(false);
    }
    setLastName(e.currentTarget.value);
    //console.log("N: " + e.currentTarget.value);
    if (
      firstName === "" &&
      e.currentTarget.value === "" &&
      email === "" &&
      password === ""
    )
      setIsDisabled(true);
  }

  function handleEmailChange(e) {
    if (isDisabled) {
      setIsDisabled(false);
    }
    setEmail(e.currentTarget.value);
    if (firstName === "" && e.currentTarget.value === "" && password === "")
      setIsDisabled(true);
  }

  function handlePasswordChange(e) {
    if (isDisabled) {
      setIsDisabled(false);
    }
    setPassword(e.currentTarget.value);
    if (firstName === "" && email === "" && e.currentTarget.value === "")
      setIsDisabled(true);
  }

  const newAccountForm = (
    <AccountForm
      firstName={firstName}
      handleFirstNameChange={handleFirstNameChange}
      lastName={lastName}
      handleLastNameChange={handleLastNameChange}
      dob={dob}
      handleDOBChange={(date) => setDOB(date)}
      email={email}
      handleEmailChange={handleEmailChange}
      password={password}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleCreate}
      isDisabled={isDisabled}
      isNewAccount={true}
      label="Create Account"
    />
  );

  return (
    <Card
      header="Create Account"
      className="card brand-centered brand-margin-top"
      maxWidth="40rem"
      status={status}
      body={
        show ? (
          newAccountForm
        ) : (
          <>
            <h5>Success</h5>
            <button
              type="submit"
              className="btn brand-button"
              onClick={clearForm}
            >
              Add another account
            </button>
            <br />
          </>
        )
      }
    />
  );
}

export default CreateAccount;